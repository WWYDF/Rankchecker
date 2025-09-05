export {};

declare global {
  interface Window {
    api: {
      runFetch: (args?: unknown) => Promise<unknown>;
    };
  }
}
