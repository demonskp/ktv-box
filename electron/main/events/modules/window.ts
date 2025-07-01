import { BrowserWindow, ipcMain } from "electron";
import { EventHandler } from "..";

export default class WindowEventHandle implements EventHandler {
  _win?: BrowserWindow;

  constructor(win: BrowserWindow) {
    this._win = win;
  }

  load() {
    ipcMain.handle("close_window", () => {
      this._win?.close();
    });
    ipcMain.handle("min_window", () => {
      this._win?.minimize();
    });
    ipcMain.handle("max_window", (e, props: { max: boolean }) => {
      const { max } = props;
      const win = this._win;
      if (max) {
        win?.unmaximize();
      } else {
        win?.maximize();
      }
      return !max;
    });
    ipcMain.handle("dev_tool", () => {
      this._win?.webContents.openDevTools();
    });
  }
}
