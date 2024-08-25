const DEFAULT_BG_COLOR = '#FFFFFF';
const DEFAULT_COLOR = '#000000';
const DEFAULT_SIZE = 16;

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let normalColor = DEFAULT_COLOR;
let bgColor = DEFAULT_BG_COLOR;

const buttons = document.querySelectorAll('.btn');
const slider = document.getElementById('slider');
const sizeValue = document.getElementById('sizeValue');
const colorPicker = document.getElementById('colorPicker');
const bgColorPicker = document.getElementById('bgColorPicker');
const rainbowBtn = document.getElementById('rainbowBtn');
const normalBtn = document.getElementById('normalBtn');
const eraserBtn = document.getElementById('eraserBtn');
const toggleLines = document.getElementById('lines');
const toggleHover = document.getElementById('hover');

slider.onmousemove = (e) => {
  updateSizeValue(e.target.value);
};
slider.onchange = (e) => {
  changeSize(e.target.value);
};
colorPicker.oninput = (e) => {
  changeColor(e.target.value);
  normalBtn.classList.add('active');
};
bgColorPicker.oninput = (e) => {
  setBackgroundColor(e.target.value);
};
normalBtn.onclick = () => {
  changeColor(normalColor);
};
rainbowBtn.onclick = () => {
  changeColor('rainbow');
};
eraserBtn.onclick = () => {
  changeColor(bgColor, 'eraser');
};

toggleLines.addEventListener('change', toggleLinesEffect);
toggleHover.addEventListener('change', toggleHoverEffect);

function setCurrentSize(newSize) {
  currentSize = newSize;
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function populateBoard(size) {
  let board = document.querySelector('.board');
  let squares = board.querySelectorAll('div');
  squares.forEach((div) => div.remove());
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  let amount = size * size;
  for (let i = 0; i < amount; i++) {
    let square = document.createElement('div');
    square.className = 'square';
    square.addEventListener('click', colorSquare);
    square.style.backgroundColor = bgColor;
    if (toggleLines.checked) {
      square.style.border = '1px solid black';
    } else {
      square.style.border = 'none';
    }
    board.insertAdjacentElement('beforeend', square);
  }
}

function reloadBoard() {
  populateBoard(currentSize);
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `Grid size: ${value} x ${value}`;
}

function changeSize(value) {
  setCurrentSize(value);
  reloadBoard();
}

function colorSquare(e) {
  if (e.type === 'mouseover' && !mouseDown) return;

  if (currentColor === 'rainbow') {
    e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  } else {
    e.target.style.backgroundColor = currentColor;
  }
}

function changeColor(choice, eraser = null) {
  currentColor = choice;
  if (choice !== 'rainbow' && !eraser) {
    normalColor = choice;
  }
}

function setBackgroundColor(choice) {
  bgColor = choice;
  reloadBoard();
}

function resetBoard() {
  let board = document.querySelector('.board');
  let squares = board.querySelectorAll('div');
  squares.forEach((div) => (div.style.backgroundColor = bgColor));
}

function handleClick(event) {
  buttons.forEach((button) => button.classList.remove('active'));
  event.target.classList.add('active');
}

buttons.forEach((button) => button.addEventListener('click', handleClick));

function toggleLinesEffect() {
  let squares = document.querySelectorAll('.square');
  squares.forEach((square) => {
    if (toggleLines.checked) {
      square.style.border = `1px solid ${currentColor}`;
    } else {
      square.style.border = 'none';
    }
  });
}

function toggleHoverEffect() {
  let squares = document.querySelectorAll('.square');
  squares.forEach((square) => {
    if (toggleHover.checked) {
      square.addEventListener('mouseover', colorSquare);
    } else {
      square.removeEventListener('mouseover', colorSquare);
    }
  });
}

window.onload = () => {
  populateBoard(currentSize);
};
