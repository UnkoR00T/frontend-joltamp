import { defineStore } from "pinia";
import { io } from "socket.io-client";

export const dataWebSocket = defineStore("WebSocket", () => {
  const wsConnect = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt != null) {
      const socket = io("https://joltamp.pl/api/v0/ws/", {
        extraHeaders: {
          Authorization: jwt,
        },
      });

      socket.on("connect", () => {
        console.log("Connected to websocket server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from websocket server");
      });

      return socket;
    }

  };
  return {
    wsConnect,
  };
});
