const grid = document.querySelector('.grid');
const buttons = document.querySelector('.buttons');
let width = 16;

let updateGrid = (size) => {
  for (let i = 0; i < size ** 2; i++) {
    const box = document.createElement('div');
    box.style.width = Math.round( 800 / size * 1000) / 1000 + "px";
    box.style.height = Math.round( 800 / size * 1000) / 1000 + "px";
    box.style.boxSizing = "border-box";
    box.style.border = "1px solid grey";
    grid.appendChild(box);
  }
}

updateGrid(width);

buttons.addEventListener('click', (e) => {
  switch(e.target.id) {
    case "change-grid-btn":
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
      break;
    case "clear-btn":
      console.log('cleared');
      break;
    default:
      break;
  }
});

let removeOldGrid = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
