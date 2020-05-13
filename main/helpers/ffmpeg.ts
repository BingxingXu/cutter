import { IpcMainEvent } from 'electron'
import ffmpeg from 'fluent-ffmpeg'
import { join } from 'path'
import { createHash } from 'crypto'
import { speech as AipSpeech } from 'baidu-aip-sdk'
import { promisify } from 'util'
import { readFile, exists } from 'fs'
import { baidu } from '../../secret.json'

const md5 = createHash('md5')

class Ffmpeg {
    private taskQueue: Map<string, string>

    constructor() {
        this.taskQueue = new Map()
    }

    extractAudio(file: string, path: string, ipc: IpcMainEvent) {
        const id = md5.update(file).digest('hex')
        const command = ffmpeg(file)

        // 音频编码要求：采样率 16000，16bit 位深，单声道
        // https://cloud.baidu.com/doc/SPEECH/s/Vk38lxily
        command
            .outputOptions([
                '-vn',
                '-acodec pcm_s16le',
                '-f s16le',
                '-ac 1',
                '-ar 16000',
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

    async audio2Text(filePath: string) {
        try {
            const { API_KEY, APP_ID, SECRET_KEY } = baidu
            const isExists = await promisify(exists)(filePath)
            if (!isExists) throw new Error('FILE NOT FOUND')

            const client = new AipSpeech(APP_ID, API_KEY, SECRET_KEY);
            const voice = await promisify(readFile)(filePath)
            const voiceBase64 = new Buffer(voice)
            const result = await client.recognize(voiceBase64, 'pcm', 16000)
            console.log('rec result', result)
        } catch (err) {
            console.log('err', err)
        }


    }
}

export default new Ffmpeg()
