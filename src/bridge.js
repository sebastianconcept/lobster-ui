// const { createView, getViewUrl } = require('./utils.js')
import { createView, getViewUrl } from './utils'

const HOSTNAME = 'localhost'
const PORT = 1701

export const isConnected = socket => {
  return socket && socket.readyState === 1
}

const observeSocket = (socket, tool) => {
  socket.addEventListener('open', () => {
    tool.$capture_state().onSocketConnected &&
      tool.$capture_state().onSocketConnected(socket)
  })

  socket.addEventListener('close', () => {
    tool.$capture_state().onSocketClosed &&
      tool.$capture_state().onSocketClosed(socket)
  })

  socket.addEventListener('error', event => {
    tool.$capture_state().onSocketError &&
      tool.$capture_state().onSocketError(socket, event)
  })

  socket.addEventListener('message', event => {
    tool.$capture_state().onSocketMessage &&
      tool.$capture_state().onSocketMessage(event.data)
  })
}

// Returns the URL string for connecting a WebSocket to the server, exclusive to the given tool
const getServerUrl = () => {
  return `ws://${HOSTNAME}:${PORT}`
}

export const connect = tool => {
  const webSocket = new WebSocket(getServerUrl())
  observeSocket(webSocket, tool)
  return webSocket
}

export const openTool = selector => {
  const view = createView(getViewUrl(selector))
  view.show()
  return view
}
