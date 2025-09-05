import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "node:path";
import { runFetch } from "./services/fetcher";

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Dev (Vite) vs Prod load
  const devUrl = process.env.VITE_DEV_SERVER_URL;
  if (devUrl) {
    await win.loadURL(devUrl);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    // Adjust if your build outputs elsewhere
    await win.loadFile(path.join(__dirname, "../frontend/dist/index.html"));
  }
}

app.whenReady().then(() => {
  // Background TS "job"
  ipcMain.handle("fetch:run", async (_evt, args: unknown) => {
    return runFetch(args);
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
