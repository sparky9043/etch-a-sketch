const grid = document.querySelector('.grid');
const buttons = document.querySelector('.buttons');
let gridWidth = 16;
let isMouseDown = false;
let isRandomColor = false;

grid.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

grid.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

function updateGrid(size) {
  clearGrid(grid);
  for (let i = 0; i < size ** 2; i++) {
    const box = document.createElement('div');
    box.style.width = `${800 / size}px`;
    box.style.height = `${800 / size}px`;
    grid.appendChild(box);
  }
  selectGrid();
}

function selectGrid() {
  if (!isRandomColor) colorGrey();
  else colorRandom();
}

function colorGrey() {
  const squares = document.querySelectorAll('.grid div');
  squares.forEach((square) => {
    square.addEventListener('mousedown', function(e) {
      this.classList.add('grey');
      isMouseDown = true;
    });
    square.addEventListener('mouseover', function(e) {
      if (isMouseDown) {
        this.classList.add('grey');
      }
    });
    square.addEventListener('mouseup', function(e) {
      isMouseDown = false;
    });
  });
}

function colorRandom() {
    const squares = document.querySelectorAll('.grid div');
  squares.forEach((square) => {
    square.addEventListener('mousedown', function(e) {
      const red = Math.floor(Math.random()*256);
      const blue = Math.floor(Math.random()*256);
      const green = Math.floor(Math.random()*256);
      this.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
      isMouseDown = true;
    });
    square.addEventListener('mouseover', function(e) {
      if (isMouseDown) {
        const red = Math.floor(Math.random()*256);
        const blue = Math.floor(Math.random()*256);
        const green = Math.floor(Math.random()*256);
        this.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
      }
    });
    square.addEventListener('mouseup', function(e) {
      isMouseDown = false;
    });
  });
}


function clearGrid(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

updateGrid(gridWidth);

buttons.addEventListener('click', (e) => {
  switch(e.target.id) {
    case "change-grid-btn":
      do {
        gridWidth = +prompt('How many grids would you like per side? Enter a number between 0 to 100.');
      } while (
        !Number.isInteger(gridWidth) ||
        gridWidth < 0 ||
        gridWidth > 100
        );
      updateGrid(gridWidth);
      break;
    case "clear-btn":
      updateGrid(gridWidth);
      break;
    case "random-btn":
      const randomBtn = document.querySelector('#random-btn');
      if (!isRandomColor) {
        isRandomColor = true;
        randomBtn.textContent = "Random: On";
      } else {
        isRandomColor = false;
        randomBtn.textContent = "Random: Off";
      }
      selectGrid();
  }
});