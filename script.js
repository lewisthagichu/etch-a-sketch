// const DEFAULT_COLOR = "#ffffff";
const DEFAULT_SIZE = 16;

let currentSize = DEFAULT_SIZE;
// let currentColor = DEFAULT_COLOR;

const buttons = document.querySelectorAll(".btn");
const slider = document.getElementById("slider");
const sizeValue = document.getElementById("sizeValue");

slider.onmousemove = (e) => {
  updateSizeValue(e.target.value);
};
slider.onchange = (e) => {
  changeSize(e.target.value);
};

//function to set new board size
function setCurrentSize(newSize) {
  currentSize = newSize;
}

let color = "black";
let click = true;
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function populateBoard(size) {
  let board = document.querySelector(".board");
  let squares = board.querySelectorAll("div");
  squares.forEach((div) => div.remove());
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  let amount = size * size;
  for (let i = 0; i < amount; i++) {
    let square = document.createElement("div");
    square.addEventListener("mousedown", colorSquare);
    square.addEventListener("mouseover", colorSquare);
    square.style.backgroundColor = "white";
    square.style.border = "0.2px solid black";
    board.insertAdjacentElement("beforeend", square);
  }
}

// function to reload the board
function reloadBoard() {
  populateBoard(currentSize);
}

//function to update the sizeValue div
function updateSizeValue(value) {
  sizeValue.innerHTML = `Grid size: ${value} x ${value}`;
}

//function to adjust number of squares
function changeSize(value) {
  setCurrentSize(value);
  reloadBoard();
}

//function to determine color of each square
function colorSquare(e) {
  if (e.type === "mouseover" && !mouseDown) {
    return;
  } else {
    e.preventDefault();
  }

  if (color == "rainbow") {
    this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  } else {
    this.style.backgroundColor = color;
  }
}

//function to change color of squares
function changeColor(choice) {
  color = choice;
}

//function to reset board
function resetBoard() {
  let board = document.querySelector(".board");
  let squares = board.querySelectorAll("div");
  squares.forEach((div) => (div.style.backgroundColor = "white"));
}

// Define the click event handler function
function handleClick(event) {
  // Remove the class from all buttons
  buttons.forEach((button) => button.classList.remove("active"));

  // Add the class to the clicked button
  event.target.classList.add("active");
}

// Attach the click event listener to each button
buttons.forEach((button) => button.addEventListener("click", handleClick));

window.onload = () => {
  populateBoard(currentSize);
};
