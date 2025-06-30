import { app, Menu } from "electron"


const menus = Menu.buildFromTemplate([
    {
        label: "文件",
        submenu: [
            {
                click(menuItem, browserWindow, event) {
                    console.log(1111)
                },
                label: '导入',
            }
        ]
    }
])


export function loadMenus() {
    Menu.setApplicationMenu(menus);
}
