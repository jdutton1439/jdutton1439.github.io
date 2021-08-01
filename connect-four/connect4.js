/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** 
 * makeBoard: create in-JS board structure:
 * board = array of rows, each row is array of cells  (board[y][x])
 */
makeBoard = () => {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push([]);
    for (let x = 0; x < WIDTH; x++) {
      board[y].push(null);
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
makeHtmlBoard = () => {
  // grab the game board table from the DOM
  let htmlBoard = document.getElementById("board");

  /** 
   * create element for top row of table
   * assign it the "column-top" id
   * then tell it to handle inputs
   */
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  /**
   * for each column:
   *  - create a cell;
   *  - assign a column number;
   *  - add the cell to the rop row
   */
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }

  // finally add the top row to the game board
  htmlBoard.append(top);

  // TODO: add comment for this code
  /**
   * create a table row for each row:
   *  - for each column:
   *    + create a cell;
   *    + assign the cell's location;
   *    + add the cell to the row
   *  - add the row to the game board
   */
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
findSpotForCol = (x) => {
  // instantiate return variable, out, as null
  let out = null;

  /**
   * check all cells in column starting from bottom
   * if cell is empty, update out and exit loop
   */
  for (let y = HEIGHT-1; y >= 0; y--) {
    if (board[y][x] === null) {
      out = y;
      break;
    }
  }

  /**
   * return out
   *  - expect null if column is full
   *  - expect cell value if column has empty space
   */
  return out;
}

/** placeInTable: update DOM to place piece into HTML table of board */
placeInTable = (y, x) => {
  /**
   * create a div called piece
   * set its class to piece
   * set its id (read: color) based on player
   */
  const piece = document.createElement("div");
  piece.setAttribute("class", "piece");
  piece.setAttribute("id", (currPlayer === 1) ? "red" : "blue");

  const cell = document.getElementById(`${y}-${x}`);

  cell.append(piece);
}

/** endGame: announce game end */
endGame = (msg) => alert(msg);

/** handleClick: handle click of column top to play piece */
handleClick = (evt) => {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  let msg = null;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win or tie
  if (checkForWin()) {
    msg = `Player ${currPlayer} won!`;
  } else if (checkForTie()) { 
    msg = "Game was a tie!";
  }

  if (msg !== null) return endGame(msg);

  // switch players
  currPlayer = (currPlayer === 1) ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  /**
   * iterates through all cells
   * instantiates arrays starting at current cell for:
   *  - four cells right;
   *  - four cells down;
   *  - four cells down-right;
   *  - four cells down-left;
   * returns true if any satisfy the _win function
   */
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

/** called if checkForWin() is false */
function checkForTie() {
  return board[0].every(val => val !== null);
}

makeBoard();
makeHtmlBoard();
