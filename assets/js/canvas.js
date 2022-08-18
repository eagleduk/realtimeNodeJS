const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let fill = false;

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
  const x = event.offsetX;
  const y = event.offsetY;

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

const divs = document.querySelectorAll("div");

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

const range = document.getElementById("jsRange");

function changeLineWidth(event) {
  ctx.lineWidth = event.target.value;
}

if (range) {
  range.addEventListener("change", changeLineWidth);
}

const jsMode = document.getElementById("jsMode");

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

const jsSave = document.getElementById("jsSave");

function startSave() {
  const url = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = url;
  link.download = "download.png";
  link.click();
}

if (jsSave) {
  jsSave.addEventListener("click", startSave);
}
