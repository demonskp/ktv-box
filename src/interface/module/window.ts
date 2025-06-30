export function closeWindow() {
  window.ipcRenderer.invoke("close_window");
}

export function minWindow() {
  window.ipcRenderer.invoke("min_window");
}

export function maxWindow() {
  return window.ipcRenderer.invoke("max_window");
}

export function devTool() {
  return window.ipcRenderer.invoke("dev_tool");
}
