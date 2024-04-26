const grid = document.querySelector('.grid');
const htmlStyle = getComputedStyle(document.documentElement);
const gridSize = parseInt(htmlStyle.getPropertyValue('--grid-size'));
const controls = document.querySelector('.controls');
const defaultBorderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color');

let width = 20;
let isMouseDown = false;
let isRandomOn = false;
let isGridOn = true;
let r, g, b;

grid.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

grid.addEventListener('dragstart', function(e) {
  e.preventDefault();
});

controls.addEventListener('click', function(e) {
  if (e.target.type !== 'button') return;
  switch (e.target.id) {
    case "submit-btn":
      const width = document.querySelector('#width');
      const newWidth = parseInt(width.value);
      adjustGrid(newWidth);
      eraseColor();
      break;
    case "clear-btn":
      eraseColor();
      break;
    case "random-btn":
      if (!isRandomOn) {
        isRandomOn = true;
        e.target.value = 'Random: On'
        e.target.style.background = '#262626';
        e.target.style.color = '#ffffff';
      } else if (isRandomOn) {
        isRandomOn = false;
        e.target.style.removeProperty('background');
        e.target.style.removeProperty('color');
        e.target.value = 'Random: Off'
      }
      selectSquare();
      break;
    case "grid-btn":
      const root = document.documentElement;
      if (isGridOn) {
        isGridOn = false;
        root.style.setProperty('--border-color', '#ffffff');
        e.target.value = 'Grid: Off';
      } else if (!isGridOn) {
        isGridOn = true;
        root.style.setProperty('--border-color', defaultBorderColor);
        e.target.value = 'Grid: On';
      }
      break;
    default:
      break;
  }
});

function createGrid(newWidth) {
  for (let i = 0; i < newWidth * newWidth; i++) {
    const box = document.createElement('div');
    box.style.width = `${gridSize / newWidth}px`;
    box.style.height = `${gridSize / newWidth}px`;
    grid.appendChild(box);
  }

  selectSquare();
}

function selectSquare() {
  const squares = document.querySelectorAll('.grid div');
  squares.forEach(square => square.addEventListener('mousedown', updateColorMouseDown));
  squares.forEach(square => square.addEventListener('mouseenter', updateColorMouseEnter));
  squares.forEach(square => square.addEventListener('mouseup', turnMouseOff));
}

createGrid(width);


function updateColorMouseDown(e) {
  if (!this.dataset.clicked) {
    this.style.background = pickColor();
    this.setAttribute('data-brightness', '10');
    this.setAttribute('data-clicked', 'true');
  } else makeDarker(this);
  isMouseDown = true;
}

function updateColorMouseEnter(e) {
  if (isMouseDown && !this.dataset.clicked) {
    this.style.background = pickColor();
    this.setAttribute('data-brightness', '10');
    this.setAttribute('data-clicked', 'true');
  }
}

function turnMouseOff(e) {
  isMouseDown = false;
}

function makeDarker(input) {
  let index = parseInt(input.dataset.brightness);
  if (index) {
    index--;
    input.style.filter = `brightness(0.${index})`;
    input.dataset.brightness = index;
  }
}

function eraseColor() {
  const squares = document.querySelectorAll('.grid div');
  squares.forEach(square => {
    square.removeAttribute('data-clicked');
    square.removeAttribute('data-brightness');
    square.style.removeProperty('background');
    square.style.removeProperty('filter');
  });
}

function adjustGrid(input) {
  if (width === input) return;
  if (isNaN(input) || input < 10 || input > 100) {
    alert('Please enter a valid number greater than 10 and less than 100!');
    return;
  } else if (width < input) {
    const extra = input**2 - width**2;
    for (let i = 0; i < extra; i++) {
      const box = document.createElement('div');
      grid.appendChild(box);
    }
  } else if (width > input) {
    const extra = width**2 - input**2;
    for (let i = 0; i < extra; i++) {
      grid.removeChild(grid.lastChild);
    }
  }

  width = input;
  const squares = document.querySelectorAll('.grid div');
  squares.forEach(square => {
    square.style.width = `${gridSize / width}px`;
    square.style.height = `${gridSize / width}px`;
  });

  selectSquare();
}

function pickColor() {
  let color;
  if (isRandomOn) {
    r = Math.floor(Math.random()*255);
    g = Math.floor(Math.random()*255);
    b = Math.floor(Math.random()*255); 
    color = `rgb(${r},${g},${b})`;
  } else if (!isRandomOn){
    color = '#808080';
  }
  return color;
}