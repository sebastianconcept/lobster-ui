const sendMessage = (socket, payload) => socket.send(JSON.stringify(payload))

export const sendHandshake = (socket, id, viewType, options = {}) =>
  sendMessage(socket, {
    type: 'Handshake',
    id,
    viewType,
    ...options
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

export const sendIntrospect = (socket, nodeSpec) => {
  sendMessage(socket, {
    type: 'Introspect',
    nodeSpec
  })
}

export const parsed = rawAnswer => {
  const payload = JSON.parse(rawAnswer)
  return {
    messageType: payload.messageType,
    answer: payload.answer,
    payload: payload.payload
  }
}
