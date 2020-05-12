import { Menu, crashReporter, app } from 'electron';
import serve from 'electron-serve';

import { createWindow, getMenu } from './helpers';
import './ipc/main';

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
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // const temp = getMenu()
  // const menu = Menu.buildFromTemplate(temp)
  // Menu.setApplicationMenu(menu)

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

})();

app.on('window-all-closed', () => {
  app.quit();
});
