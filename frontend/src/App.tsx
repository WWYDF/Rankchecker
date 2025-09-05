import { useMemo, useState } from "react";

type FetchResult = {
  ok: boolean;
  fetchedAt: string;
  payload?: { message?: string; items?: string[] };
};

type RatingRow = { username: string; rating: number | null; error?: string };

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FetchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [recentUsers, setRecentUsers] = useState<string[] | null>(null);
  const [ratings, setRatings] = useState<RatingRow[] | null>(null);

  const items = useMemo(() => data?.payload?.items ?? [], [data]);

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
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 font-sans flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md p-4">
        <div className="mx-auto flex items-center justify-center gap-3">
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
      </div>

      {/* Content */}
      <div className="p-5 grid place-items-start justify-center">
        <div className="min-w-[min(900px,94vw)] space-y-4">

          {/* Status card (unchanged) */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-lg">
            {!data && !error && <div className="text-zinc-400">Click “Fetch” to run the background task.</div>}
            {error && <div className="text-red-300">Error: {error}</div>}
            {data && (
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  {data.ok ? <span className="text-emerald-300">ok</span> : <span className="text-red-300">error</span>}
                </div>
                <div><span className="font-semibold">Fetched At:</span> {data.fetchedAt}</div>
                <div className="mt-2"><span className="font-semibold">Message:</span> {data.payload?.message ?? "—"}</div>
              </div>
            )}
          </div>

          {/* Debug box: usernames + ratings */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-lg">
            <div className="font-semibold mb-2">Recent usernames & first ratings</div>

            {/* Usernames list */}
            <div className="mb-3">
              <div className="text-sm text-zinc-400 mb-1">From OmegaStrikers.log</div>
              {recentUsers ? (
                recentUsers.length ? (
                  <ul className="list-decimal pl-6 space-y-1">
                    {recentUsers.map((u, i) => (
                      <li key={`${u}-${i}`} className="break-all">{u}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-zinc-400">No matching entries found.</div>
                )
              ) : loading ? (
                <div className="text-zinc-400">Scanning log…</div>
              ) : (
                <div className="text-zinc-400">Click Fetch to read the log.</div>
              )}
            </div>

            {/* Ratings table */}
            <div>
              <div className="text-sm text-zinc-400 mb-1">From API</div>
              {ratings ? (
                ratings.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-zinc-400">
                        <tr>
                          <th className="text-left font-medium py-1 pr-4">Username</th>
                          <th className="text-left font-medium py-1">First rating</th>
                          <th className="text-left font-medium py-1">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ratings.map((r) => (
                          <tr key={r.username} className="border-t border-zinc-800">
                            <td className="py-1 pr-4 break-all">{r.username}</td>
                            <td className="py-1">{r.rating ?? "—"}</td>
                            <td className="py-1 text-zinc-400">{r.error ? `error: ${r.error}` : "ok"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-zinc-400">No ratings fetched.</div>
                )
              ) : recentUsers ? (
                <div className="text-zinc-400">Fetching ratings…</div>
              ) : (
                <div className="text-zinc-400">—</div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
