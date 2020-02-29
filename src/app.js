const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow
let watcher

if (process.env.NODE_ENV === 'development') {
  watcher = require('chokidar').watch(path.join(__dirname, '../public/build'), {
    ignoreInitial: true
  })
  watcher.on('change', () => {
    mainWindow.reload()
  })
}

function createWindow () {
  const mode = process.env.NODE_ENV
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 720,
    height: 368
  })

  mainWindow.loadURL(`file://${path.join(__dirname, '../public/index.html')}`)
  mainWindow.on('closed', () => {
    watcher.close()
    watcher = null
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (watcher) {
    watcher.close()
  }
  app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

app.onSocketConnected = socket => {
  if (app.socket && app.socket.readyState === 1) {
    throw new Error("There is already a socket and it's connected")
  }
  app.socket = socket
}

app.onSocketClosed = socket => {
  app.socket = null
}

app.onSocketError = (socket, event) => {
  console.log('Socket error:', event)
}

app.onSocketMessage = event => {
  console.log(event.data)
}

module.exports = {
  app
}
