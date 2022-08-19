import { getSocket } from "./socket";
import { EVENTS } from "./variables";

const CANVASWIDTH = 700;
const CANVASHEIGHT = 700;

const gameContainer = document.querySelector("div#gameContainer");

const canvas = gameContainer.querySelector("canvas#jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = CANVASWIDTH;
canvas.height = CANVASHEIGHT;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let fill = false;

function stopPainting() {
  painting = false;
}

function fillRect() {
  ctx.fillRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
}

function startPainting() {
  if (fill) {
    fillRect();
  } else {
    painting = true;
  }
}

export function startPaint(x, y, lineWidth = undefined, color = undefined) {
  let currentWidth = ctx.lineWidth;
  if (lineWidth) ctx.lineWidth = lineWidth;

  let currentColor = ctx.strokeStyle;
  if (color) ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.moveTo(x, y);

  ctx.lineWidth = currentWidth;
  ctx.strokeStyle = currentColor;
}

export function endPaint(x, y, lineWidth = undefined, color = undefined) {
  let currentWidth = ctx.lineWidth;
  if (lineWidth) ctx.lineWidth = lineWidth;

  let currentColor = ctx.strokeStyle;
  if (color) ctx.strokeStyle = color;

  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.lineWidth = currentWidth;
  ctx.strokeStyle = currentColor;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    startPaint(x, y);
    getSocket().emit(EVENTS.sendStartPaint, {
      x,
      y,
      lineWidth: ctx.lineWidth,
      color: ctx.strokeStyle,
    });
  } else {
    endPaint(x, y);
    getSocket().emit(EVENTS.sendEndPaint, {
      x,
      y,
      lineWidth: ctx.lineWidth,
      color: ctx.strokeStyle,
    });
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

const divs = gameContainer.querySelectorAll("div");

function changeColor(event) {
  ctx.fillStyle = event.target.style.backgroundColor;
  ctx.strokeStyle = event.target.style.backgroundColor;
}

if (divs) {
  divs.forEach((div) => {
    if (div.classList.contains("controls_color")) {
      div.addEventListener("click", changeColor);
    }
  });
}

const range = gameContainer.querySelector("input#jsRange");

function changeLineWidth(event) {
  ctx.lineWidth = event.target.value;
}

if (range) {
  range.addEventListener("change", changeLineWidth);
}

const jsMode = gameContainer.querySelector("input#jsMode");

function startFill(event) {
  const text = event.target.innerText;
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
