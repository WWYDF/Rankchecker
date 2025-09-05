import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  runFetch: (args?: unknown) => ipcRenderer.invoke("fetch:run", args),
  
  getRecentUsernames: (count?: number) =>
    ipcRenderer.invoke("os:getRecentUsernames", count) as Promise<string[]>,

  getPlayerRatings: (usernames: string[]) =>
    ipcRenderer.invoke("players:getRatings", usernames) as Promise<
      { username: string; rating: number | null; error?: string }[]
    >,
});
