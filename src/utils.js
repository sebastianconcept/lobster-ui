const path = require('path')
const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow

export const views = []

export const newHash = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15)

export const getViewUrl = selector => {
  return `file://${path.join(__dirname, `/view.html#${selector}`)}`
}

export const createView = (viewUrl, options) => {
  return createBrowserWindow(viewUrl, options)
}

const defaultBrowserWindowOptions = {
  webPreferences: {
    nodeIntegration: true
  },
  width: 900,
  height: 680
}

function removeView (browserWindow) {
  views.splice(views.indexOf(browserWindow), 1)
}

function createBrowserWindow (url, options = defaultBrowserWindowOptions) {
  const newBrowserWindow = new BrowserWindow(options)
  newBrowserWindow.loadURL(url)
  newBrowserWindow.on('closed', () => {
    removeView(newBrowserWindow)
  })
  return newBrowserWindow
}
