import { CONSTANTS, EVENTS } from "./variables";

globalThis.realTimeJS = {};

export const setSocket = () => (globalThis.realTimeJS.socket = io("/"));

export const getSocket = () => globalThis.realTimeJS.socket;

const initSocket = () => {
  const { socket } = globalThis.realTimeJS;

  socket.on(EVENTS.newUser, ({ nickname }) => {
    console.log(`${nickname} has enter.`);
  });
};

export const enterUser = (nickname) => {
  localStorage.setItem(CONSTANTS.nickname, nickname);
  globalThis.realTimeJS.socket.emit(EVENTS.enterUser, { nickname });
  initSocket();
};
