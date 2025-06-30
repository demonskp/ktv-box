import { app, BrowserWindow, ipcMain } from "electron";
import os from "node:os";
import { loadMenus } from "./menus";
import { createMainWindow } from "./windows";
import { loadHooks } from "./life-hooks";
import { loadEvents } from "./events";

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;

// 加载菜单
loadMenus();
// 创建主窗口
app.whenReady().then(async () => {
  win = await createMainWindow();

  // 加载生命周期处理
  loadHooks(win);
  // 加载自定义事件
  loadEvents(win);

  // app.setAsDefaultProtocolClient("mytest");
  // app.on("open-url", (e, url) => {
  //   const path = app.getPath("exe");
  //   console.log(1111, url, path);
  // });
});
