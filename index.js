const grid = document.querySelector('.grid');
const initialWidth = 16;

let updateGrid = (size) => {
  for (let i = 0; i < initialWidth ** 2; i++) {
    const box = document.createElement('div');
    box.style.width = 800 / size + "px";
    box.style.height = 800 / size + "px";
    box.style.boxSizing = "border-box";
    box.style.border = "1px solid grey";
    grid.appendChild(box);
  }
}

updateGrid(initialWidth);

