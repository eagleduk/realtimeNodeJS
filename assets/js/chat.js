import { getSocket } from "./socket";
import { EVENTS } from "./variables";

const gameContainer = document.querySelector("div#gameContainer");

const chatForm = gameContainer.querySelector("form");
const chatContainer = gameContainer.querySelector("ul.chatContainer");

const handleChatSubmit = (event) => {
  event.preventDefault();
  const input = chatForm.querySelector("input");
  const { value: message } = input;
  getSocket().emit(EVENTS.sendMessage, {
    message,
  });
  input.value = "";
  addChatMessage({ message });
};

chatForm && gameContainer.addEventListener("submit", handleChatSubmit);

export const addChatMessage = ({ nickname = "You", message }) => {
  const li = document.createElement("li");
  li.innerHTML = `<span>${nickname}</span>: ${message}`;
  chatContainer.appendChild(li);
};
