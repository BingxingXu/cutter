import { ipcRenderer } from 'electron'

export const extractAudio = (file: string, path: string) => {
    ipcRenderer.send('IPC_EXTRACT_AUDIO', { file, path })
    //
    ipcRenderer.on('IPC_EXTRACT_AUDIO_REPLY', (event, args) => {
        console.log('args', args)
    })
}