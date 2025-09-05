import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "node:path";
import { getRecentUsernames } from "./services/oslog";
import { getPlayerRatings } from "./services/stats";

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

  ipcMain.handle("os:getRecentUsernames", async (_evt, count?: number) => {
    return getRecentUsernames(typeof count === "number" ? count : 4);
  });

  ipcMain.handle("players:getRatings", async (_evt, usernames: string[]) => {
    if (!Array.isArray(usernames)) return [];
    return getPlayerRatings(usernames);
  });
  
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
