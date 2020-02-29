const sendMessage = (socket, payload) => socket.send(JSON.stringify(payload))

export const sendHandshake = (socket, id, viewType) =>
  sendMessage(socket, {
    type: 'Handshake',
    id,
    viewType
  })

export const sendDoIt = (socket, sourceCode) =>
  sendMessage(socket, {
    type: 'DoIt',
    sourceCode
  })
