import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  shell,
} from "electron";
import path from "node:path";
import { CommonHelper, ConstHelper } from "../helpers";

const preload = path.join(ConstHelper.DIST_PATH, "./preload/index.mjs");
const indexHtml = path.join(ConstHelper.RENDERER_DIST, "index.html");

export interface PtWindowConfig extends BrowserWindowConstructorOptions {
  url: string;
}

export async function createWindow({ url, ...rest }: PtWindowConfig) {
  const win = new BrowserWindow({
    icon: path.join(ConstHelper.VITE_PUBLIC, "favicon.ico"),
    ...rest,
  });

  if (CommonHelper.isUrl(url)) {
    win.loadURL(url);
  } else {
    win.loadFile(url);
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (CommonHelper.isUrl(url)) shell.openExternal(url);
    return { action: "deny" };
  });

  return win;
}

export async function createMainWindow() {
  const win = await createWindow({
    title: "主窗口",
    url: ConstHelper.VITE_DEV_SERVER_URL || indexHtml,
    webPreferences: {
      preload,
    },
    frame: false,
    width: 1200,
    height: 800,
    transparent: true,
    backgroundColor: "rgba(0, 0, 0, 0)",
  });

  // win.webContents.openDevTools()
  return win;
}
