const body = document.querySelector("body");

export const newUserEnter = (nickname) => {
  const div = document.createElement("div");
  div.className = "notification noti";
  div.innerHTML = `${nickname} has entered.`;

  body.appendChild(div);
};

export const leaveUser = (nickname) => {
  const div = document.createElement("div");
  div.className = "notification alert";
  div.innerHTML = `${nickname} has leave.`;

  body.appendChild(div);
};
