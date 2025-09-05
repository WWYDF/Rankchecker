import * as fs from "node:fs/promises";
import * as path from "node:path";

function getLogPath(): string {
  if (process.platform === "win32") {
    const local = process.env.LOCALAPPDATA || "";
    return path.join(local, "OmegaStrikers", "Saved", "Logs", "OmegaStrikers.log");
  }
  throw new Error("OmegaStrikers log path only implemented for Windows.");
}

/**
 * Efficiently read from the end of a huge file until we’ve found `limit` usernames.
 * We read fixed-size chunks from the end, accumulate partial lines, and parse
 * only the most recent completed lines.
 */
export async function getRecentUsernames(limit = 8): Promise<string[]> {
  const file = getLogPath();
  const stat = await fs.stat(file);
  const fd = await fs.open(file, "r");

  const CHUNK = 512 * 1024; // 512 KB
  let pos = stat.size;
  let carry = "";
  const found: string[] = [];
  const seen = new Set<string>(); // keep track duplicates to skip

  try {
    while (pos > 0 && found.length < limit) {
      const len = Math.min(CHUNK, pos);
      pos -= len;

      const buf = Buffer.allocUnsafe(len);
      await fd.read(buf, 0, len, pos);

      const chunkStr = buf.toString("utf8");
      const combined = chunkStr + carry;
      const parts = combined.split(/\r?\n/);
      carry = parts.shift() ?? "";

      for (let i = parts.length - 1; i >= 0 && found.length < limit; i--) {
        const line = parts[i];
        const u = extractUsername(line);
        if (u && !seen.has(u)) {
          seen.add(u);
          found.push(u);
        }
      }
    }

    if (found.length < limit && carry) {
      const u = extractUsername(carry);
      if (u && !seen.has(u)) {
        seen.add(u);
        found.push(u);
      }
    }

    return found.slice(0, limit);
  } finally {
    await fd.close();
  }
}

function extractUsername(line: string): string | null {
  if (!line.includes('"type":"player-status-update"')) return null;

  const m = line.match(/"strData":"(.*?)"/);
  if (!m) return null;

  const escaped = m[1];
  const unescaped = escaped.replace(/\\\\/g, "\\").replace(/\\"/g, '"');

  try {
    const obj = JSON.parse(unescaped);
    const username = obj?.profile?.username;
    if (typeof username === "string" && username.length > 0) return username;
  } catch {
    const m2 = line.match(/\\"username\\":\\"([^"\\]+)\\"/);
    if (m2) return m2[1];
  }
  return null;
}