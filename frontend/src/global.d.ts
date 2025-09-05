export {};

declare global {
  interface Window {
    api: {
      runFetch: (args?: unknown) => Promise<unknown>;
      getRecentUsernames: (count?: number) => Promise<string[]>;
      getPlayerRatings: (usernames: string[]) => Promise<{ username: string; rating: number | null; error?: string }[]>;
    };
  }
}
