import { useState } from "react";
import { getRankFromLP } from "./utils/ranks";

type FetchResult = {
  ok: boolean;
  fetchedAt: string;
  payload?: { message?: string; items?: string[] };
};

type RatingRow = { username: string; rating: number | null; error?: string };

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data] = useState<FetchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [recentUsers, setRecentUsers] = useState<string[] | null>(null);
  const [ratings, setRatings] = useState<RatingRow[] | null>(null);

  async function handleFetch() {
    setLoading(true);
    setError(null);
    setRecentUsers(null);
    setRatings(null);

    try {
      // latest 4 unique usernames from the log
      const names = await window.api.getRecentUsernames(4);
      setRecentUsers(names);

      // fetch ratings for those usernames
      const ratingRows = names.length ? await window.api.getPlayerRatings(names) : [];
      setRatings(ratingRows);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex max-w flex-col bg-zinc-950 text-zinc-100">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-center gap-3 px-4 py-3">
          <button
            onClick={handleFetch}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700/70 bg-zinc-900 px-4 py-2 font-semibold shadow-sm hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" />
                Fetching…
              </>
            ) : (
              "Fetch"
            )}
          </button>
        </div>
      </header>
  
      {/* Main content (scrolls if needed) */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-screen-lg xl:max-w-screen-xl px-4 py-5">
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            
            {/* Usernames */}
            <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-lg">
              <h2 className="mb-2 font-semibold">Recent Usernames</h2>
              {recentUsers ? (
                recentUsers.length ? (
                  <ul className="list-decimal space-y-1 pl-6">
                    {recentUsers.map((u, i) => (
                      <li key={`${u}-${i}`} className="break-all">{u}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-zinc-400">No matching entries found.</p>
                )
              ) : loading ? (
                <p className="text-zinc-400">Scanning log…</p>
              ) : (
                <p className="text-zinc-400">Click Fetch to read the log.</p>
              )}
              <p className="mt-3 text-xs text-zinc-500">
                Path: %localappdata%\OmegaStrikers\Saved\Logs\OmegaStrikers.log
              </p>
            </section>
  
            {/* Ratings table */}
            <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-lg">
              <h2 className="mb-2 font-semibold">Recent usernames & first ratings</h2>
              {ratings ? (
                ratings.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-zinc-400">
                        <tr>
                          <th className="py-2 pr-4 text-left font-medium">Username</th>
                          <th className="py-2 pr-4 text-left font-medium">Latest Rating</th>
                          <th className="py-2 pr-4 text-left font-medium">Rank</th>
                          <th className="py-2 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ratings.map((r) => {
                          let rankName = "—";
                          let rankImage: string | null = null;
                          let rankColor = "#a1a1aa";
  
                          if (r.rating !== null) {
                            const { rankObject } = getRankFromLP(r.rating);
                            rankName = rankObject.name;
                            rankImage = rankObject.image;
                            rankColor = rankObject.color;
                          }
  
                          return (
                            <tr key={r.username} className="border-t border-zinc-800">
                              <td className="min-w-0 py-2 pr-4">
                                <div className="truncate" title={r.username}>
                                  {r.username}
                                </div>
                              </td>
                              <td className="py-2 pr-4">{r.rating ?? "—"}</td>
                              <td className="py-2 pr-4">
                                <div className="flex min-w-0 items-center gap-2">
                                  {rankImage && (
                                    <img
                                      src={rankImage}
                                      alt={rankName}
                                      className="h-6 w-6 shrink-0 max-w-full"
                                    />
                                  )}
                                  <span className="truncate" style={{ color: rankColor }}>
                                    {rankName}
                                  </span>
                                </div>
                              </td>
                              <td className="py-2 text-zinc-400">{r.error ? `error: ${r.error}` : "OK"}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-zinc-400">No ratings fetched.</p>
                )
              ) : recentUsers ? (
                <p className="text-zinc-400">Fetching ratings…</p>
              ) : (
                <p className="text-zinc-400">—</p>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
