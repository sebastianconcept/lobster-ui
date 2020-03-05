const sendMessage = (socket, payload) => socket.send(JSON.stringify(payload))

export const sendHandshake = (socket, id, viewType) =>
  sendMessage(socket, {
    type: 'Handshake',
    id,
    viewType
  })

export const sendViewClosed = (socket, id) =>
  sendMessage(socket, {
    type: 'ViewClosed',
    id
  })

export const sendDoIt = (socket, sourceCode) =>
  sendMessage(socket, {
    type: 'DoIt',
    sourceCode
  })
export const sendPrintIt = (socket, sourceCode) =>
  sendMessage(socket, {
    type: 'PrintIt',
    sourceCode
  })

export const sendInspectIt = (socket, sourceCode) =>
  sendMessage(socket, {
    type: 'InspectIt',
    sourceCode
  })

export const parsed = rawAnswer => JSON.parse(rawAnswer)
