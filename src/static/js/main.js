(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./socket":3,"./variables":4}],2:[function(require,module,exports){
"use strict";

require("./socket");

require("./login");

},{"./login":1,"./socket":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSocket = exports.getSocket = exports.enterUser = void 0;

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
    console.log("".concat(nickname, " has enter."));
  });
};

var enterUser = function enterUser(nickname) {
  localStorage.setItem(_variables.CONSTANTS.nickname, nickname);
  globalThis.realTimeJS.socket.emit(_variables.EVENTS.enterUser, {
    nickname: nickname
  });
  initSocket();
};

exports.enterUser = enterUser;

},{"./variables":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = exports.CONSTANTS = exports.CLASSES = void 0;
var EVENTS = {
  setNickname: "setNickname",
  enterUser: "enterUser",
  newUser: "newUser"
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

},{}]},{},[2]);
