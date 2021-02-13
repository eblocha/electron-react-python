const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

/*************************************************************
 * py process
 *************************************************************/

const PY_DIST_FOLDER = path.join(process.resourcesPath,'dist')
const PY_FOLDER = '../backend'
const PY_MODULE = 'app' // without .py suffix

let pyProc = null
let pyPort = null

const guessPackaged = () => {
    const fullPath =  PY_DIST_FOLDER
    return require('fs').existsSync(fullPath)
}

const getScriptPath = () => {
    if (!guessPackaged()) {
        return path.join(__dirname, PY_FOLDER, PY_MODULE + '.py')
    }
    if (process.platform === 'win32') {
        return path.join(PY_DIST_FOLDER, PY_MODULE, PY_MODULE + '.exe')
    }
    return path.join(PY_DIST_FOLDER, PY_MODULE, PY_MODULE)
}

const selectPort = () => {
    pyPort = 5000
    return pyPort
}

const createPyProc = () => {
    let script = getScriptPath()
    let port = '' + selectPort()

    if (guessPackaged()) {
        pyProc = require('child_process').execFile(script, [port])
    } else {
        pyProc = require('child_process').spawn('python', [script, port])
    }

    if (pyProc != null) {
        //console.log(pyProc)
        console.log('child process success on port ' + port)
    }
}

const exitPyProc = () => {
    pyProc.kill()
    pyProc = null
    pyPort = null
}

app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
