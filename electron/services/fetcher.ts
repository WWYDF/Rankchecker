// Put your real background logic here (file IO, HTTP, DB, etc.)
export async function runFetch(_args?: unknown) {
  // simulate some work
  await new Promise((res) => setTimeout(res, 500));

  return {
    ok: true,
    fetchedAt: new Date().toISOString(),
    payload: {
      message: "Fetched successfully!",
      items: Array.from({ length: 3 }, (_, i) => `Item #${i + 1}`),
    },
  };
}
