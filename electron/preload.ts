import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  runFetch: (args?: unknown) => ipcRenderer.invoke("fetch:run", args),
});
