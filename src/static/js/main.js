(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var canvas = document.getElementById("jsCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
var painting = false;
var fill = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  if (fill) {
    ctx.fillRect(0, 0, 700, 700);
  } else {
    painting = true;
  }
}

function onMouseMove(event) {
  var x = event.offsetX;
  var y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

var divs = document.querySelectorAll("div");

function changeColor(event) {
  ctx.fillStyle = event.target.style.backgroundColor;
  ctx.strokeStyle = event.target.style.backgroundColor;
}

if (divs) {
  divs.forEach(function (div) {
    if (div.classList.contains("controls_color")) {
      div.addEventListener("click", changeColor);
    }
  });
}

var range = document.getElementById("jsRange");

function changeLineWidth(event) {
  ctx.lineWidth = event.target.value;
}

if (range) {
  range.addEventListener("change", changeLineWidth);
}

var jsMode = document.getElementById("jsMode");

function startFill(event) {
  var text = event.target.innerText;

  if (text === "FILL") {
    event.target.innerText = "paint";
    fill = true;
  } else {
    event.target.innerText = "fill";
    fill = false;
  }
}

if (jsMode) {
  jsMode.addEventListener("click", startFill);
}

var jsSave = document.getElementById("jsSave");

function startSave() {
  var url = canvas.toDataURL();
  var link = document.createElement("a");
  link.href = url;
  link.download = "download.png";
  link.click();
}

if (jsSave) {
  jsSave.addEventListener("click", startSave);
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addChatMessage = void 0;

var _socket = require("./socket");

var _variables = require("./variables");

var gameContainer = document.querySelector("div#gameContainer");
var chatForm = gameContainer.querySelector("form");
var chatContainer = gameContainer.querySelector("ul.chatContainer");

var handleChatSubmit = function handleChatSubmit(event) {
  event.preventDefault();
  var input = chatForm.querySelector("input");
  var message = input.value;
  (0, _socket.getSocket)().emit(_variables.EVENTS.sendMessage, {
    message: message
  });
  input.value = "";
  addChatMessage({
    message: message
  });
};

chatForm && gameContainer.addEventListener("submit", handleChatSubmit);

var addChatMessage = function addChatMessage(_ref) {
  var _ref$nickname = _ref.nickname,
      nickname = _ref$nickname === void 0 ? "You" : _ref$nickname,
      message = _ref.message;
  var li = document.createElement("li");
  li.innerHTML = "<span>".concat(nickname, "</span>: ").concat(message);
  chatContainer.appendChild(li);
};

exports.addChatMessage = addChatMessage;

},{"./socket":6,"./variables":7}],3:[function(require,module,exports){
"use strict";

var _socket = require("./socket");

var _variables = require("./variables");

var body = document.querySelector("body");
var loginContainer = document.querySelector("div#loginContainer");
var loginForm = loginContainer.querySelector("form");
var nickname = localStorage.getItem(_variables.CONSTANTS.nickname);

if (nickname) {
  (0, _socket.setSocket)();
  (0, _socket.enterUser)(nickname);
  body.className = _variables.CLASSES.login;
} else {
  body.className = _variables.CLASSES.logout;
}

var handleLoginSubmit = function handleLoginSubmit(event) {
  event.preventDefault();
  var input = loginForm.querySelector("input");
  var nickname = input.value;
  (0, _socket.setSocket)();
  (0, _socket.enterUser)(nickname);
  input.value = "";
};

loginForm && loginForm.addEventListener("submit", handleLoginSubmit);

},{"./socket":6,"./variables":7}],4:[function(require,module,exports){
"use strict";

require("./socket");

require("./login");

require("./canvas");

},{"./canvas":1,"./login":3,"./socket":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserEnter = exports.leaveUser = void 0;
var body = document.querySelector("body");

var newUserEnter = function newUserEnter(nickname) {
  var div = document.createElement("div");
  div.className = "notification noti";
  div.innerHTML = "".concat(nickname, " has entered.");
  body.appendChild(div);
};

exports.newUserEnter = newUserEnter;

var leaveUser = function leaveUser(nickname) {
  var div = document.createElement("div");
  div.className = "notification alert";
  div.innerHTML = "".concat(nickname, " has leave.");
  body.appendChild(div);
};

exports.leaveUser = leaveUser;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSocket = exports.getSocket = exports.enterUser = void 0;

var _chat = require("./chat");

var _noti = require("./noti");

var _variables = require("./variables");

globalThis.realTimeJS = {};

var setSocket = function setSocket() {
  return globalThis.realTimeJS.socket = io("/");
};

exports.setSocket = setSocket;

var getSocket = function getSocket() {
  return globalThis.realTimeJS.socket;
};

exports.getSocket = getSocket;

var initSocket = function initSocket() {
  var socket = globalThis.realTimeJS.socket;
  socket.on(_variables.EVENTS.newUser, function (_ref) {
    var nickname = _ref.nickname;
    (0, _noti.newUserEnter)(nickname);
  });
  socket.on(_variables.EVENTS.reciveMessage, function (_ref2) {
    var nickname = _ref2.nickname,
        message = _ref2.message;
    (0, _chat.addChatMessage)({
      nickname: nickname,
      message: message
    });
  });
  socket.on(_variables.EVENTS.leaveUser, function (_ref3) {
    var nickname = _ref3.nickname;
    (0, _noti.leaveUser)(nickname);
  });
  socket.on("disconnect", function () {});
};

var enterUser = function enterUser(nickname) {
  localStorage.setItem(_variables.CONSTANTS.nickname, nickname);
  globalThis.realTimeJS.socket.emit(_variables.EVENTS.enterUser, {
    nickname: nickname
  });
  initSocket();
};

exports.enterUser = enterUser;

},{"./chat":2,"./noti":5,"./variables":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = exports.CONSTANTS = exports.CLASSES = void 0;
var EVENTS = {
  setNickname: "setNickname",
  enterUser: "enterUser",
  newUser: "newUser",
  sendMessage: "sendMessage",
  reciveMessage: "reciveMessage",
  disconnect: "disconnect",
  leaveUser: "leaveUser"
};
exports.EVENTS = EVENTS;
var CONSTANTS = {
  nickname: "nickname"
};
exports.CONSTANTS = CONSTANTS;
var CLASSES = {
  login: "login",
  logout: "logout"
};
exports.CLASSES = CLASSES;

},{}]},{},[4]);
