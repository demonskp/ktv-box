import { BrowserWindow, ipcMain } from "electron";
import { EventHandler } from "..";


export default class WindowEventHandle implements EventHandler {
    _win?: BrowserWindow

    constructor(win: BrowserWindow) {
        this._win = win;
    }

    load() {
        ipcMain.handle("close_window", () => {
            this._win?.close()
        })
        ipcMain.handle("min_window", () => {
            this._win?.minimize()
        })
        ipcMain.handle("max_window", () => {
            const win = this._win;
            if (win?.isMaximized()) {
                win?.unmaximize()
            } else {
                this._win?.maximize()
            }
            return !!win?.isMaximized()
        })
        ipcMain.handle("dev_tool", () => {
            this._win?.webContents.openDevTools()
        })
    }
}
