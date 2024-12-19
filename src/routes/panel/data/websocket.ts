import { defineStore } from 'pinia'

export const useWebsockets = defineStore('ws', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const MessagesListeners: Function[] = []
  const socket = new WebSocket('wss://joltamp.pl/api/v0/ws/?token=' + localStorage.getItem('jwt'))
  socket.onopen = (msg) => {
    console.log(msg)
    // TO DO
  }
  socket.onclose = (msg) => {
    console.log(msg)
    // TO DO
  }
  socket.onmessage = (msg: MessageEvent) => {
    // Type is described on Notions pages
    // Payload may be different for every type <3
    const data = JSON.parse(msg.data) as { type: string; payload: {[key: string]: any } };
    console.log(data)
    if (data.payload != null) MessagesListeners.forEach(l => l(data));
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const addMessageListener = (listener: Function) => {
    MessagesListeners.push(listener)
  }
  return { addMessageListener }
})