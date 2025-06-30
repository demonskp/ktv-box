import { BrowserWindow, ipcMain } from "electron";
import { EventHandler } from "..";
import path from "node:path";
import fs from "node:fs";
import { ConstHelper } from "../../helpers";

export default class FileEventHandle implements EventHandler {
  _win?: BrowserWindow;

  constructor(win: BrowserWindow) {
    this._win = win;
  }

  load() {
    ipcMain.handle("file_list", (e, { dirPath }) => {
      const realDirPath = path.resolve(ConstHelper.APP_DATA, dirPath);
      if (!fs.existsSync(realDirPath)) {
        fs.mkdirSync(realDirPath);
      }

      return true;
    });
  }
}
