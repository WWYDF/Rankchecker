export type PlayerRatingResult = {
  username: string;
  rating: number | null; // null if none/failed
  error?: string;
};

const BASE = "https://api.clarioncorp.net/v2/cached/players/";

export async function getPlayerRatings(usernames: string[]): Promise<PlayerRatingResult[]> {
  const safe = Array.from(new Set(usernames.filter(Boolean))).slice(0, 20); // guard
  const controller = new AbortController();

  const tasks = safe.map(async (u) => {
    const enc = encodeURIComponent(u);
    const url = `${BASE}${enc}`;

    const t = setTimeout(() => controller.abort(), 12_000); // 12s timeout per batch
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) {
        return { username: u, rating: null, error: `HTTP ${res.status}` };
      }
      const json: any = await res.json();
      const rating: number | null =
        Array.isArray(json?.data?.ratings) && json.data.ratings.length
          ? Number(json.data.ratings[0]?.rating ?? null)
          : null;

      return { username: u, rating: Number.isFinite(rating) ? rating : null };
    } catch (e: any) {
      return { username: u, rating: null, error: e?.name === "AbortError" ? "timeout" : e?.message ?? "fetch failed" };
    } finally {
      clearTimeout(t);
    }
  });

  // Run in parallel for now, but probably chunk/limit concurrency later.
  const results = await Promise.all(tasks);
  return results;
}
