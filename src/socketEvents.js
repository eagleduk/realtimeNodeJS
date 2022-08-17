import { EVENTS } from "../assets/js/variables";

const socketEvents = (socket) => {
  socket.on(EVENTS.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
  });
  socket.on(EVENTS.enterUser, ({ nickname }) => {
    console.log(nickname);
    socket.broadcast.emit(EVENTS.newUser, { nickname });
  });
};

export default socketEvents;
