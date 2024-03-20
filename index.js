const grid = document.querySelector('.grid');
const buttons = document.querySelector('.buttons');
let width = 16;
let isMouseDown = false;
let isRandomColor = false;

grid.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

grid.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

let updateGrid = (size) => {
  for (let i = 0; i < size ** 2; i++) {
    const box = document.createElement('div');
    box.style.width = Math.round( 800 / size * 1000) / 1000 + "px";
    box.style.height = Math.round( 800 / size * 1000) / 1000 + "px";
    box.style.boxSizing = "border-box";
    box.style.border = "1px solid rgb(203, 203, 203)";
    box.style.backgroundColor = "";
    grid.appendChild(box);
  }
}

updateGrid(width);
selectGrid();

buttons.addEventListener('click', (e) => {
  switch(e.target.id) {
    case "change-grid-btn":
      clearGrid();
      let newSize;
      do {
        newSize = +prompt('How many grids would you like per side? Enter a number between 0 to 100.');
      } while (
        !Number.isInteger(newSize) ||
        newSize < 0 ||
        newSize > 100
        );
      width = newSize;
      removeOldGrid(grid);
      updateGrid(width);
      selectGrid();
      break;
    case "clear-btn":
      clearGrid();
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



let removeOldGrid = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function selectGrid() {
  let squares = document.querySelectorAll('.grid div');
  if (!isRandomColor) {
    for (const square of squares) {
      square.addEventListener('mousedown', function(e) {
        this.style.backgroundColor = 'grey';
        isMouseDown = true;
      });
      square.addEventListener('mouseover', function(e) {
        if (isMouseDown) {
          this.style.backgroundColor = 'grey';
        }
      });
      square.addEventListener('mouseup', function(e) {
        isMouseDown = false;
      });
    }
  } else if (isRandomColor) {
    for (const square of squares) {
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
    }
  }
}

let clearGrid = () => {
  let squares = Array.from(document.querySelectorAll('.grid div'));
  for (const square of squares) {
    square.style.backgroundColor = '';
  }
}