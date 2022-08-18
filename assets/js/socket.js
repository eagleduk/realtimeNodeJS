import { addChatMessage } from "./chat";
import { leaveUser, newUserEnter } from "./noti";
import { CONSTANTS, EVENTS } from "./variables";

globalThis.realTimeJS = {};

export const setSocket = () => (globalThis.realTimeJS.socket = io("/"));

export const getSocket = () => globalThis.realTimeJS.socket;

const initSocket = () => {
  const { socket } = globalThis.realTimeJS;

  socket.on(EVENTS.newUser, ({ nickname }) => {
    newUserEnter(nickname);
  });

  socket.on(EVENTS.reciveMessage, ({ nickname, message }) => {
    addChatMessage({ nickname, message });
  });

  socket.on(EVENTS.leaveUser, ({ nickname }) => {
    leaveUser(nickname);
  });
  socket.on("disconnect", () => {});
};

export const enterUser = (nickname) => {
  localStorage.setItem(CONSTANTS.nickname, nickname);
  globalThis.realTimeJS.socket.emit(EVENTS.enterUser, { nickname });
  initSocket();
};
