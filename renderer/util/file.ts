import { ipcRenderer } from 'electron'
import path from 'path'

export interface IFolderScanArgs {
    folderPath: string
    ignorePath: string[]
    ignoreExt: string[]
    ignoreFile: boolean
    ignoreDotStartFile: boolean
    ignoreDotStartFolder: boolean
    deep: number
}
export interface IFileType {
    isShow: boolean
    isShowElements: boolean
    dev: number
    mode: number
    nlink: number
    uid: number
    gid: number
    rdev: number
    blksize: number
    ino: number
    size: number
    blocks: number
    atimeMs: number
    mtimeMs: number
    ctimeMs: number
    birthtimeMs: number
    atime: Date
    mtime: Date
    ctime: Date
    birthtime: Date
    isFile: boolean
    isDirectory: boolean
    filePath: string
    filePathFull: string
    root: string
    dir: string
    base: string
    ext: string
    name: string
    elements: IFileType[]
}

export const selectFolder = (args?: any): Promise<string> => {
    ipcRenderer.send('IPC_FOLDER_SELECT', args)
    return new Promise((res, rej) => {
        ipcRenderer.on(
            'IPC_FOLDER_SELECT_REPLY',
            (event, arg) => {
                res(arg)
            }
        )
    })
}
export const scanFolder = (arg: string | IFolderScanArgs): Promise<IFileType[]> => {
    let defaultArg = {
        folderPath: '/',
        ignorePath: ['node_modules', 'dist', '.git'].map(e => path.sep + e),
        ignoreExt: [],
        ignoreFile: false,
        ignoreDotStartFile: false,
        ignoreDotStartFolder: false,
        deep: 3
    }

    if (typeof arg === 'string') {
        defaultArg = { ...defaultArg, folderPath: arg }
    } else {
        defaultArg = arg
    }

    ipcRenderer.send('IPC_FOLDER_SCAN', defaultArg)
    return new Promise((res, rej) => {
        ipcRenderer.on(
            'IPC_FOLDER_SCAN_REPLY',
            (event, arg) => {
                res(arg)
            }
        )
    })
}