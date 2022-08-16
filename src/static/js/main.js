(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleReceiveMessage = handleReceiveMessage;

function handleReceiveMessage(_ref) {
  var nickname = _ref.nickname,
      text = _ref.text;
  console.log("".concat(nickname, ": ").concat(text));
}

},{}],2:[function(require,module,exports){
"use strict";

var _chat = require("./chat");

var socket = io();
socket.on("receiveMessage", _chat.handleReceiveMessage);

function sendMessage(text) {
  socket.emit("sendMssage", {
    text: text
  });
  console.log("You: ".concat(text));
}

function setNickname(nickname) {
  socket.emit("setNickname", {
    nickname: nickname
  });
}

},{"./chat":1}]},{},[2]);
