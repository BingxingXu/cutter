import { Menu, crashReporter, app, ipcMain, dialog } from 'electron';
import serve from 'electron-serve';
import Store from 'electron-store';

import { createWindow, getMenu } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
  crashReporter.start({
    companyName: 'minx',
    submitURL: '',
  })

} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1920,
    height: 1080,
  });

  const temp = getMenu()
  const menu = Menu.buildFromTemplate(temp)
  Menu.setApplicationMenu(menu)

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  // select dir
  ipcMain.on('select-dir', async (event, arg) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    })
    event.returnValue = result
  })

  // store
  const store = new Store()
  ipcMain.on('get-item', (event, arg) => {
    event.returnValue = store.get('item')
  });

  ipcMain.on('add-item', (event, arg) => {
    const item = store.get('item') || [];
    item.push(arg)
    store.set('item', item)
  });

})();

app.on('window-all-closed', () => {
  app.quit();
});



