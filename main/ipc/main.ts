import { ipcMain, BrowserWindow, dialog, shell } from 'electron';
import { promisify } from 'util';
import fs from 'fs';
import Store from 'electron-store';

import scan from '../helpers/folder';

// 选择文件夹
ipcMain.on('IPC_FOLDER_SELECT', async (event, arg) => {
    const window = BrowserWindow.getFocusedWindow()
    const result = await dialog.showOpenDialog(window, {
        properties: [
            'openDirectory',
            'createDirectory'
        ]
    })
    if (!result.canceled) {
        event.reply('IPC_FOLDER_SELECT_REPLY', result.filePaths[0])
    }
})

// 显示文件列表
ipcMain.on('IPC_FOLDER_SCAN', async (event, arg) => {
    try {
        event.reply('IPC_FOLDER_SCAN_REPLY', await scan({
            ...arg,
            needCheckIsFolder: true
        }))
    } catch (err) {
        console.log("IPC error", err)
    }

})

// 导出文件夹
ipcMain.on('IPC_EXPORT', async (event, {
    name,
    value,
    openAfterExport,
    openFolderAfterExport
}) => {
    const window = BrowserWindow.getFocusedWindow()
    const result = await dialog.showSaveDialog(window, { defaultPath: name })
    if (result.canceled === false) {
        const ws = promisify(fs.writeFile)
        await ws(result.filePath, new Uint8Array(Buffer.from(value)))

        if (openAfterExport) {
            shell.openItem(result.filePath)
        } else if (openFolderAfterExport) {
            shell.showItemInFolder(result.filePath)
        }
    }
})

/**
 * 发送桌面通知
 */
ipcMain.on('IPC_SEND_NOTIFICATION', async () => { })

/**
 * 
 */
const store = new Store()
ipcMain.on('IPC_GET_ITEM', (event, arg) => {
    let key = ''

    if (typeof arg === 'string') {
        key = arg
    }

    event.returnValue = store.get(key)
});

ipcMain.on('IPC_SET_ITEM', (event, arg) => {
    try {
        const { key, value } = arg
        store.set(key, value)
    } catch (err) {

    }
});