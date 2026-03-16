import { platform } from "@tauri-apps/plugin-os";
import { homeDir, join } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { windows_log, linux_log, macos_log } from "../constants";
import { logger } from "../logger";

export type MatchPhase =
  | 'EMatchPhase::None'
  | 'EMatchPhase::BanSelect'
  | 'EMatchPhase::LoadoutSelect'
  | 'EMatchPhase::CharacterSelect'
  | 'EMatchPhase::VersusScreen'
  | 'EMatchPhase::FaceOffIntro'
  | 'EMatchPhase::InGame'
  | 'EMatchPhase::GoalScore'
  | 'EMatchPhase::Intermission'
  | 'EMatchPhase::PostGameCelebration';

// Shared line offset (Persists across page navigations without React state)
let _lineOffset = 0;

export const logState = {
  get lineOffset() { return _lineOffset; },
  set lineOffset(n: number) { _lineOffset = n; },
};

export async function getLogPath(): Promise<string> {
  const os = platform();
  const home = await homeDir();
  let suffix = '';
  switch (os) {
    case 'windows': suffix = windows_log; break;
    case 'linux':   suffix = linux_log;   break;
    case 'macos':   suffix = macos_log;   break;
    default:        suffix = windows_log;
  }
  // Absolute paths (like WSL /mnt/c/...) are used as is
  const resolved = suffix.startsWith('/') ? suffix : await join(home, suffix);
  logger.info(`Log path resolved (os=${os})`, resolved);
  return resolved;
}

export function parseMatchPhase(line: string): MatchPhase | null {
  const match = line.match(/LogPMPerfStatsSubsystem: Game context: MatchPhase: '(EMatchPhase::\w+)'/);
  if (!match) return null;
  const phase = match[1] as MatchPhase;
  logger.info(`Phase -> ${phase}`);
  return phase;
}

export function parsePlayerRegistration(line: string): string | null {
  const match = line.match(/LogPMPlayerState: Player '([^']+)' registering training '([^']+)'/);
  if (!match) return null;
  logger.info(`Player detected: ${match[1]} (${match[2]})`);
  return match[1];
}

/** Read any new lines added since the last call, updating the shared offset.
 *  Throws if the file cannot be read - callers are responsible for handling errors. */
export async function readNewLines(logPath: string): Promise<string[]> {
  const before = performance.now();
  logger.debug(`Checking for new lines...`);
  const content = await readTextFile(logPath);
  const lines = content.split('\n');
  const newLines = lines.slice(_lineOffset);
  if (newLines.length > 0) {
    const diff = performance.now() - before;
    logger.debug(`Read ${newLines.length} new line(s) (offset ${_lineOffset} -> ${lines.length}) [${diff.toFixed(1)} ms]`);
  }
  _lineOffset = lines.length;
  return newLines;
}

/** Seek to end of log so we only see events from this point forward. */
export async function seekToEnd(logPath: string): Promise<void> {
  try {
    const content = await readTextFile(logPath);
    _lineOffset = content.split('\n').length;
    logger.info(`Seeked to end of log (line ${_lineOffset})`);
  } catch (e) {
    _lineOffset = 0;
    logger.warn('seekToEnd failed - Starting from line 0', e);
  }
}
