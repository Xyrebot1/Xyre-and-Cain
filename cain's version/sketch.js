// Maze Game
// Xyre Abelanes
// April 16, 2018

let rows = 14;
let cols = 32;
let grid;
let cellSize;
let moveX;
let moveY;
let gridMode;
let testTile;
let mapLoad;
let mapLoadOne;
let mapData;
let mapDataOne;
let commonTile;
let upperTile;
let upperTileRightOpening;
let upperTileLeftOpening;
let upperTileRightCorner;
let upperTileLeftCorner;
let lowerTile;
let lowerTileRightOpening;
let lowerTileLeftOpening;
let lowerTileRightCorner;
let lowerTileLeftCorner;
let rightTile;
let leftTile;
let player;
let playerX;
let playerY;
let menuTexture;
let playerIsBlocked;
let current area;


function preload() {
  mapLoad = "assets/Maps/TestMap.txt";
  mapLoadOne = "assests/Maps/Test.txt";
  mapData = loadStrings(mapLoad);

  menuTexture = loadImage("images/qubodup-light_wood.png");
  commonTile = loadImage("images/Tile_5.png");
  upperTile = loadImage("images/Tile_8.png");
  upperTileRightOpening = loadImage("images/Tile_11.png");
  upperTileLeftOpening = loadImage("images/Tile_10.png");
  upperTileRightCorner = loadImage("images/Tile_7.png");
  upperTileLeftCorner = loadImage("images/Tile_9.png");
  lowerTile = loadImage("images/Tile_2.png");
  lowerTileRightOpening = loadImage("images/Tile_13.png");
  lowerTileLeftOpening = loadImage("images/Tile_12.png");
  lowerTileRightCorner = loadImage("images/Tile_1.png");
  lowerTileLeftCorner = loadImage("images/Tile_3.png");
  rightTile = loadImage("images/Tile_4.png");
  leftTile = loadImage("images/Tile_6.png");
  // player = loadImage("images/Object_7.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = width / cols;
  grid = createEmpty2dArray(cols, rows);
  moveX = 1;
  moveY = 1;
  gridMode = 1;
  playerX = 50;
  playerY = 50;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let tileType = mapData[x][y];
      grid[x][y] = tileType;
    }
  }
}

function draw() {
  background(0, 200, 255);
  displayGrid();
  playerThing();
  menuBar();
  movePlayer();
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
        image(commonTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 2 || grid[x][y] === "2") {
        fill(255, 50, 50);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 3 || grid[x][y] === "3") {
        image(upperTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 4 || grid[x][y] === "4") {
        image(lowerTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 5 || grid[x][y] === "5") {
        image(upperTileRightOpening, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 6 || grid[x][y] === "6") {
        image(upperTileLeftOpening, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "*") {
        image(upperTileRightCorner, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "#") {
        image(upperTileLeftCorner, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 7 || grid[x][y] === "7") {
        image(lowerTileRightOpening, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === 8 || grid[x][y] === "8") {
        image(lowerTileLeftOpening, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "$") {
        image(lowerTileRightCorner, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "%") {
        image(lowerTileLeftCorner, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === "|") {
        image(rightTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[x][y] === ":") {
        image(leftTile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else {
        fill(0, 200, 255);
      }
      noFill();
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}



function playerThing() {
  fill(225, 255, 0);
  rect(playerX, playerY, cellSize / 1.5, cellSize / 1.5);
}

function menuBar() {
  fill(153, 102, 51);
  rect(0, rows * cellSize, width, 3 * cellSize);
}



// function isPathBlocked() {
//   if (grid[x][y] === 0 || grid[x][y] === "0") {
//     playerIsBlocked = false;
//   } else {
//     playerIsBlocked = true;
//   }
// }

// function movePlayer() {
//   if (keyIsDown(87)) {
//     if (grid[moveX][moveY] === "0" || grid[moveX][moveY] === 0) {
//       playerY -= 3;
//     }
//   }
//   else if (keyIsDown(83)) {
//     if (grid[moveX][moveY] === "0" || grid[moveX][moveY] === 0) {
//       playerY += 3;
//     }
//   }
//   else if (keyIsDown(65)) {
//     if (grid[moveX][moveY] === "0" || grid[moveX][moveY] === 0) {
//       playerX -= 3;
//     }
//   }
//   else if (keyIsDown(68)) {
//     if (grid[moveX][moveY] === "0" || grid[moveX][moveY] === 0) {
//       playerX += 3;
//     }
//   }
//
// }

 function movePlayer() {
  if (keyIsDown(87)) {
     playerY -= 3;
   }
   else if (keyIsDown(83)) {
     playerY += 3;
   }
   else if (keyIsDown(65)) {
     playerX -= 3;
   }
   else if (keyIsDown(68)) {
     playerX += 3;
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
