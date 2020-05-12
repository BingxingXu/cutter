import { remote } from 'electron'

const electronFs = remote.require('fs')

export default class FileTree {
    path: string | null
    name: string | null
    items: string[]

    constructor(path, name = null) {
        this.path = path
        this.name = name
        this.items = []
    }

    static readDir(path: string) {
        const fileArray = []
        electronFs.readdir(path, () => {

        })
    }
}