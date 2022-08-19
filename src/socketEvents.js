import { EVENTS } from "../assets/js/variables";

const socketEvents = (socket) => {
  socket.on(EVENTS.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
  });
  socket.on(EVENTS.enterUser, ({ nickname }) => {
    socket.nickname = nickname;
    socket.broadcast.emit(EVENTS.newUser, { nickname });
  });
  socket.on(EVENTS.sendMessage, ({ message }) => {
    socket.broadcast.emit(EVENTS.reciveMessage, {
      message,
      nickname: socket.nickname,
    });
  });
  socket.on(EVENTS.disconnect, () => {
    socket.broadcast.emit(EVENTS.leaveUser, {
      nickname: socket.nickname,
    });
  });
  socket.on(EVENTS.sendStartPaint, (data) => {
    socket.broadcast.emit(EVENTS.reciveStartPaint, data);
  });
  socket.on(EVENTS.sendEndPaint, (data) => {
    socket.broadcast.emit(EVENTS.reciveEndPaint, data);
  });
};

export default socketEvents;
