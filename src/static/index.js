const socket = io();

socket.on("receiveMessage", ({ nickname, text }) => {
  console.log(`${nickname}: ${text}`);
});

function sendMessage(text) {
  socket.emit("sendMssage", { text });
  console.log(`You: ${text}`);
}

function setNickname(nickname) {
  socket.emit("setNickname", { nickname });
}
