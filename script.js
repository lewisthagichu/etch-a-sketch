let color = "black";
let click = true;

let button = document.querySelectorAll(".btn");

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
    board.insertAdjacentElement("beforeend", square);
  }
}

populateBoard(16);

//function to adjust number of squares
function changeSize(input) {
  if (input >= 2 || input <= 100) {
    populateBoard(input);
  } else {
    console.log("Invalid input");
  }
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
