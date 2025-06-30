import { BrowserWindow, ipcMain } from "electron";
import UpdateEventHandler from "./modules/update";
import WindowEventHandle from "./modules/window";
import FileEventHandle from "./modules/file";

export interface EventHandler {
  load: () => void;
}

export function loadEvents(win: BrowserWindow) {
  const updateEventHandler = new UpdateEventHandler(win);
  updateEventHandler.load();
  const windowEventHandle = new WindowEventHandle(win);
  windowEventHandle.load();
  const fileEventHandle = new FileEventHandle(win);
  fileEventHandle.load();
}
