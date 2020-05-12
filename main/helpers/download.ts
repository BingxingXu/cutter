import youtubedl from 'youtube-dl'
import fs from 'fs'
import { join } from 'path'
import { ipcMain } from 'electron'

import store from './store'

export const download = (url: string, file: string, path: 'string') => {

    const video = youtubedl(url)
    video.on('', () => { })
    video.pipe(fs.createWriteStream(join(path, file)))

}