import { useMemo, useState } from "react";

type FetchResult = {
  ok: boolean;
  fetchedAt: string;
  payload?: { message?: string; items?: string[] };
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FetchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const items = useMemo(() => data?.payload?.items ?? [], [data]);

  async function handleFetch() {
    setLoading(true);
    setError(null);
    try {
      const result = (await window.api.runFetch()) as FetchResult;
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 font-sans flex flex-col">
      {/* Top bar with centered Fetch button */}
      <div className="sticky top-0 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md p-4 flex justify-center">
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

      {/* Content */}
      <div className="p-5 grid place-items-start justify-center">
        <div className="min-w-[min(700px,90vw)] rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-lg">
          {!data && !error && (
            <div className="text-zinc-400">Click “Fetch” to run the background task.</div>
          )}

          {error && <div className="text-red-300">Error: {error}</div>}

          {data && (
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {data.ok ? (
                  <span className="text-emerald-300">ok</span>
                ) : (
                  <span className="text-red-300">error</span>
                )}
              </div>
              <div>
                <span className="font-semibold">Fetched At:</span> {data.fetchedAt}
              </div>
              <div className="mt-2">
                <span className="font-semibold">Message:</span>{" "}
                {data.payload?.message ?? "—"}
              </div>
              <div className="mt-2 font-semibold">Items:</div>
              {items.length ? (
                <ul className="list-disc pl-5 space-y-1">
                  {items.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-zinc-400">—</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
