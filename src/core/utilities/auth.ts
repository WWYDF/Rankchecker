import { platform } from "@tauri-apps/plugin-os"
import { linux_identity, windows_identity } from "../constants";
import { homeDir, join } from "@tauri-apps/api/path";
import { IdentityFile } from "../../types/auth";
import { readTextFile } from "@tauri-apps/plugin-fs";

const os = platform();

export async function fetchAuth(): Promise<IdentityFile | null> {
  const idenPath = 
    os == 'windows' ? windows_identity
    : linux_identity
  ;

  const home = await homeDir();
  const fullPath = await join(home, idenPath);

  try {
    const contents = await readTextFile(fullPath);
    const identity = JSON.parse(contents) as IdentityFile;
    return identity
  } catch (e) {
    console.error(`Failed to find identity.json!`, e);
    return null;
  }
}