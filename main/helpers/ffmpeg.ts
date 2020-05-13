import { IpcMainEvent } from 'electron'
import ffmpeg from 'fluent-ffmpeg'
import { join } from 'path'
import { createHash } from 'crypto'

const md5 = createHash('md5')

class Ffmpeg {
    private taskQueue: Map<string, string>

    constructor() {
        this.taskQueue = new Map()
    }

    extractAudio(file: string, path: string, ipc: IpcMainEvent) {
        const id = md5.update(file).digest('hex')
        const command = ffmpeg(file)

        command
            .outputOptions([
                '-vn',
                '-acodec pcm_s16le',
                '-f s16le',
                '-y' // 覆盖已有文件
            ])
            .on('start', (commandLine: string) => {
                ipc.reply('IPC_EXTRACT_AUDIO_REPLY', {
                    id,
                    progress: 0,
                    error: null,
                    message: `${commandLine}`
                })
            })
            .on('progress', (progress) => {
                ipc.reply('IPC_EXTRACT_AUDIO_REPLY', {
                    id,
                    progress: progress.percent,
                    error: null,
                    message: ''
                })
            })
            .on('end', () => {
                ipc.reply('IPC_EXTRACT_AUDIO_REPLY', {
                    id,
                    progress: 100,
                    error: null,
                    message: ''
                })
            })
            .on('error', (err: Error, stdout, stderr) => {
                ipc.reply('IPC_EXTRACT_AUDIO_REPLY', {
                    id,
                    progress: -1,
                    error: err,
                    message: ''
                })
            })
            .save(join(path, 'output.pcm'));
    }
}

export default new Ffmpeg()
