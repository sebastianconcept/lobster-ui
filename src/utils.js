const path = require('path')
const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow

const HOSTNAME = 'localhost'
const PORT = 1701

const defaultWidth = 600
const defaultHeight = 400

export const views = []

export const newHash = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15)

// Returns the URL string for connecting a WebSocket to the server, exclusive to the given tool
export const getServerUrl = () => {
  return `ws://${HOSTNAME}:${PORT}`
}

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
  width: defaultWidth,
  height: defaultHeight
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

export const openTool = selector => {
  const view = createView(getViewUrl(selector))
  view.show()
  return view
}
