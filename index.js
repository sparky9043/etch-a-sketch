const grid = document.querySelector('.grid');
const buttons = document.querySelector('.buttons');
let gridWidth = 16;
let isMouseDown = false;
// let isRandomColor = false;

grid.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

grid.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

function updateGrid(size) {
  for (let i = 0; i < size ** 2; i++) {
    const box = document.createElement('div');
    box.style.width = `${800 / size}px`;
    box.style.height = `${800 / size}px`;
    grid.appendChild(box);
  }
}

updateGrid(gridWidth);

// updateGrid(width);
// selectGrid();

// buttons.addEventListener('click', (e) => {
//   switch(e.target.id) {
//     case "change-grid-btn":
//       clearGrid();
//       let newSize;
//       do {
//         newSize = +prompt('How many grids would you like per side? Enter a number between 0 to 100.');
//       } while (
//         !Number.isInteger(newSize) ||
//         newSize < 0 ||
//         newSize > 100
//         );
//       width = newSize;
//       removeOldGrid(grid);
//       updateGrid(width);
//       selectGrid();
//       break;
//     case "clear-btn":
//       clearGrid();
//       break;
//     case "random-btn":
//       const randomBtn = document.querySelector('#random-btn');
//       if (!isRandomColor) {
//         isRandomColor = true;
//         randomBtn.textContent = "Random: On";
//       } else {
//         isRandomColor = false;
//         randomBtn.textContent = "Random: Off";
//       }
//       selectGrid();
//   }
// });

// function removeOldGrid(element) {
//   while (element.firstChild) {
//     element.removeChild(element.firstChild);
//   }
// }

// function selectGrid() {
//   let squares = document.querySelectorAll('.grid div');
//   if (!isRandomColor) {
//     for (const square of squares) {
//       let clicked = 0;
//       square.addEventListener('mousedown', function(e) {
//         this.style.backgroundColor = 'grey';
//         isMouseDown = true;
//       });
//       square.addEventListener('mouseover', function(e) {
//         if (isMouseDown) {
//           this.style.backgroundColor = 'grey';
//         }
//       });
//       square.addEventListener('mouseup', function(e) {
//         isMouseDown = false;
//       });
//       square.addEventListener('click', function(e) {
//         if (this.style.backgroundColor) {
//           this.style.filter = `brightness(${(10 - ++clicked) / 10})`;
//         }
//       });
//     }
//   } else if (isRandomColor) {
//     for (const square of squares) {
//       let clicked = 0;
//       square.addEventListener('mousedown', function(e) {
//         const red = Math.floor(Math.random()*256);
//         const blue = Math.floor(Math.random()*256);
//         const green = Math.floor(Math.random()*256);
//         this.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
//         isMouseDown = true;
//       });
//       square.addEventListener('mouseover', function(e) {
//         if (isMouseDown) {
//           const red = Math.floor(Math.random()*256);
//           const blue = Math.floor(Math.random()*256);
//           const green = Math.floor(Math.random()*256);
//           this.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
//         }
//       });
//       square.addEventListener('mouseup', function(e) {
//         isMouseDown = false;
//       });
//       square.addEventListener('click', function(e) {
//         if (this.style.backgroundColor) {
//           this.style.filter = `brightness(${(10 - ++clicked) / 10})`;
//         }
//       });
//     }
//   }
// }

// function clearGrid() {
//   let squares = document.querySelectorAll('.grid div');
//   for (const square of squares) {
//     square.style.backgroundColor = '';
//     square.style.filter = '';
//   }
//   selectGrid();
// }