import { enterUser, setSocket } from "./socket";
import { CONSTANTS, CLASSES } from "./variables";

const body = document.querySelector("body");

const loginContainer = document.querySelector("div#loginContainer");

const loginForm = loginContainer.querySelector("form");
const nickname = localStorage.getItem(CONSTANTS.nickname);

if (nickname) {
  setSocket();
  enterUser(nickname);
  body.className = CLASSES.login;
} else {
  body.className = CLASSES.logout;
}

const handleLoginSubmit = (event) => {
  event.preventDefault();
  const input = loginForm.querySelector("input");
  const { value: nickname } = input;
  setSocket();
  enterUser(nickname);
  input.value = "";
};

loginForm && loginForm.addEventListener("submit", handleLoginSubmit);
