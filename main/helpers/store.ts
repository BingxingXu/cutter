import Store from 'electron-store'

class MyStore {
    _store: Store

    constructor() {
        this._store = new Store()
    }

}

export default new MyStore()
