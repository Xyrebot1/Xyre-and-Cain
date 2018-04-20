// Maze Game
// Xyre Abelanes
// April 16, 2018

let rows = 27;
let cols = 33;
let grid;
let cellSize;
let moveX;
let moveY;
let gridMode;
let loadOneMaze;
let loadTwoMaze;
let loadThreeMaze;
let lines;
let lines2;
let lines3;
let mazeGrid;
let mazeGrid2;
let mazeGrid3;
let cheatMode = false;

// The maps of Mazes
function preload() {
  loadOneMaze = "assets/mazes/1stMaze.txt";
  loadTwoMaze = "assets/mazes/2ndMaze.txt";
  loadThreeMaze = "assets/mazes/3rdMaze.txt";
  lines = loadStrings(loadOneMaze);
  lines2 = loadStrings(loadTwoMaze);
  lines3 = loadStrings(loadThreeMaze);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = width / (cols * 1.8);
  mazeGrid = createEmpty2dArray(cols, rows);
  mazeGrid2 = createEmpty2dArray(cols, rows);
  mazeGrid3 = createEmpty2dArray(cols, rows);
  moveX = 0;
  moveY = 5;
  gridMode = 1;

  // preparing the mazes
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let tileType = lines[x][y];
      mazeGrid[x][y] = tileType;
    }
  }
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let tileType = lines2[x][y];
      mazeGrid2[x][y] = tileType;
    }
  }
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let tileType = lines3[x][y];
      mazeGrid3[x][y] = tileType;
    }
  }
  grid = mazeGrid;
}

function draw() {
  background(255);
  displayGrid();
  playerThing();
  textSize(40);
  text("Use Arrow Keys to move.", width / 2 + 150, height / 4 - 200);
  // Shown at the end screen
  if (gridMode === 4) {
    textSize(50);
    fill(random(255),random(255),random(255));
    text("You finished the MAZE! Well Done!",width / 2 - 300, height / 2);
  }
}

// disables window scrolling
function noscroll() {
  window.scrollTo(0, 0);
}

window.addEventListener("scroll", noscroll);

//shows the grid(mazes)
function displayGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y] === 0 || grid[x][y] === "0") {
        fill(240);
      }
      else if (grid[x][y] === 2 || grid[x][y] === "2") {
        fill(255, 50, 50);
      }
      else if (grid[x][y] === 3 || grid[x][y] === "3") {
        fill(0, 255, 50);
      }
      else {
        fill(50);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

//The red square in the screen
function playerThing() {
  grid[moveX][moveY] = 2;
}

//just a mini cheat mode
function mousePressed() {
  let xCoord = floor(mouseX / cellSize);
  let yCoord = floor(mouseY / cellSize);

  if (grid[xCoord][yCoord] === 1 || grid[xCoord][yCoord] === "1" && cheatMode) {
    grid[xCoord][yCoord] = 0;
  }
  else if (grid[xCoord][yCoord] === 0 || grid[xCoord][yCoord] === "0" && cheatMode) {
    grid[xCoord][yCoord] = 1;
  }
}

// goes to the next maze after reaching the green square
function nextLevel() {
  gridMode += 1;
  if (gridMode === 1) {
    clearOutBodies();
    moveX = 0;
    moveY = 5;
    grid = mazeGrid;
  }
  else if (gridMode === 2) {
    clearOutBodies();
    moveX = 8;
    moveY = 26;
    grid = mazeGrid2;
  }
  if (gridMode === 3) {
    clearOutBodies();
    moveX = 32;
    moveY = 25;
    grid = mazeGrid3;
  }
}

function keyPressed() {
  if (key === "c" || key === "C") {
    cheatMode = !cheatMode;
  }
  // if (key === "j" || key === "J") {
  //   clearOutBodies();
  //   moveX = 0;
  //   moveY = 5;
  //   grid = mazeGrid;
  //   gridMode = 1;
  // }
  // else if (key === "k" || key === "K") {
  //   clearOutBodies();
  //   moveX = 8;
  //   moveY = 26;
  //   grid = mazeGrid2;
  //   gridMode = 2;
  // }
  // if (key === "s" || key === "S") {
  //   clearOutBodies();
  //   moveX = 32;
  //   moveY = 25;
  //   grid = mazeGrid3;
  //   gridMode = 3;
  // }
  // Arrow keys are used to make the red square move in the screen, can't go through the black squares.
  if (keyCode === DOWN_ARROW && moveY < rows - 1 && gridMode < 4) {
    grid[moveX][moveY] = 0;
    if (grid[moveX][moveY + 1] === 0 || grid[moveX][moveY + 1] === "0") {
      moveY += 1;
    }
    else if (grid[moveX][moveY + 1] === 3 || grid[moveX][moveY + 1] === "3") {
      moveY += 1;
      nextLevel();
    }
  }
  else if (keyCode === UP_ARROW && moveY > 0 && gridMode < 4) {
    grid[moveX][moveY] = 0;
    if (grid[moveX][moveY - 1] === 0 || grid[moveX][moveY - 1] === "0") {
      moveY -= 1;
    }
    else if (grid[moveX][moveY - 1] === 3 || grid[moveX][moveY - 1] === "3") {
      moveY -= 1;
      nextLevel();
    }
  }
  if (keyCode === RIGHT_ARROW && moveX < cols - 1 && gridMode < 4) {
    grid[moveX][moveY] = 0;
    if (grid[moveX + 1][moveY] === 0 || grid[moveX + 1][moveY] === "0") {
      moveX += 1;
    }
    else if (grid[moveX + 1][moveY] === 3 || grid[moveX + 1][moveY] === "3") {
      moveX += 1;
      nextLevel();
    }
  }
  else if (keyCode === LEFT_ARROW && moveX > 0 && gridMode < 4) {
    grid[moveX][moveY] = 0;
    if (grid[moveX - 1][moveY] === 0 || grid[moveX - 1][moveY] === "0") {
      moveX -= 1;
    }
    else if (grid[moveX - 1][moveY] === 3 || grid[moveX - 1][moveY] === "3") {
      moveX -= 1;
      nextLevel();
    }
  }
}

//Just so there isn't two red squares in the screen
function clearOutBodies() {
  let theGrid = grid;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (theGrid[x][y] === 2) {
        theGrid[x][y] = 0;
      }
    }
  }
  return theGrid;
}

//Creates the base for the maze
function createEmpty2dArray(cols, rows) {
  let emptyGrid = [];
  for (let x = 0; x < cols; x++) {
    emptyGrid.push([]);
    for (let y = 0; y < rows; y++) {
      emptyGrid[x].push(0);
    }
  }
  return emptyGrid;
}

// function createMaze2dArray(cols, rows) {
//   let mazeGrid = [];
//   let test = 2;
//   let test2 = 5;
//   let number = 0;
//   let number2 = 1;
//   let wall = 2;
//   let wall2 = 6;
//   for (let x = 0; x < cols; x++) {
//     mazeGrid.push([]);
//     number += 1;
//     number2 += 1;
//     wall = 2;
//     wall2 = 6;
//     for (let y = 0; y < rows; y++) {
//       if (number === test && y === 0) {
//         mazeGrid[x].push(1);
//         mazeGrid[x].push(1);
//       }
//       else if (number2 === test2 && y === 1) {
//         for (let z = 0; z < 5; z++) {
//           mazeGrid[x].push(1);
//         }
//       }
//       if (number === test && y === 3) {
//         for (let z = 0; z < 5; z++) {
//           mazeGrid[x].push(1);
//         }
//       }
//       else if (number2 === test2 && y === 4) {
//         for (let z = 0; z < 5; z++) {
//           mazeGrid[x].push(1);
//         }
//       }
//       if (number === test && y === 6) {
//         for (let z = 0; z < 5; z++) {
//           mazeGrid[x].push(1);
//         }
//       }
//       else if (number2 === test2 && y === 7) {
//         for (let z = 0; z < 5; z++) {
//           mazeGrid[x].push(1);
//         }
//       }
//       if (number2 === test2 && y === 10) {
//         mazeGrid[x].push(1);
//         mazeGrid[x].push(1);
//         test2 += 4;
//       }
//       else if (number === test && y === 9) {
//         for (let z = 0; z < 5; z++) {
//           mazeGrid[x].push(1);
//         }
//         test += 4;
//       }
//       if (mazeGrid[x][wall] === 0 && x < cols - 1) {
//         mazeGrid[x].push(1);
//         wall += 8;
//       }
//       else if (mazeGrid[x][wall2] === 0 && x > 0) {
//         mazeGrid[x].push(1);
//         wall2 += 8;
//       }
//       else {
//         mazeGrid[x].push(0);
//       }
//     }
//   }
//   return mazeGrid;
// }
