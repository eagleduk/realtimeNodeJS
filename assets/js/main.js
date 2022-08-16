import { handleReceiveMessage } from "./chat";

const socket = io();

socket.on("receiveMessage", handleReceiveMessage);

function sendMessage(text) {
  socket.emit("sendMssage", { text });
  console.log(`You: ${text}`);
}

function setNickname(nickname) {
  socket.emit("setNickname", { nickname });
}
