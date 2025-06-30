import { app, BrowserWindow } from "electron";
import { createMainWindow } from "../windows";


export function loadHooks(mainWin: BrowserWindow | null) {
    app.on('window-all-closed', () => {
        mainWin = null
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('second-instance', () => {
        if (mainWin) {
            // Focus on the main window if the user tried to open another
            if (mainWin.isMinimized()) mainWin.restore()
            mainWin.focus()
        }
    })

    app.on('activate', () => {
        const allWindows = BrowserWindow.getAllWindows()
        if (allWindows.length) {
            allWindows[0].focus()
        } else {
            createMainWindow().then((newWin) => mainWin = newWin)
        }
    })
}