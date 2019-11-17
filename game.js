// sets variables for the board
let squares = [];
let numberOfMines = 40;
let numberOfFlags = 0;
let playerClickStage = "Clicking // Press to flag";

// position and styles the board on the page
let board = document.getElementById("board");
board.style.left = window.innerWidth / 2 - 150 + "px";
board.style.top = window.innerHeight / 2 - 220 + "px";

// position and styles the clicking buttons on the page
let clickCells = document.getElementById("clickCells");
clickCells.style.left = window.innerWidth / 2 - 150 + "px";
clickCells.style.top = window.innerHeight / 2 + 120 + "px";

// position and styles the flagging buttons on the page
let flagsLeft = document.getElementById("flagsLeft");
flagsLeft.style.left = window.innerWidth / 2 - 150 + "px";
flagsLeft.style.top = window.innerHeight / 2 + 200 + "px";

// makes the board
const makeSquares = () => {
  for (let column = 0; column < 15; column++) {
    squares.push([]);
    for (let row = 0; row < 15; row++) {
      let newSquare = {
        number: 0,
        draw: makeIndividualSquare(row * 20, column * 20, column, row),
        clickStage: "clickable"
      };
      squares[column].push(newSquare);
    }
  }

  // generates and randomises the number of mines on the board
  for (let i = 0; i < numberOfMines; i++) {
    let randomColumn = Math.floor(Math.random() * squares.length);
    let randomRow = Math.floor(Math.random() * squares[randomColumn].length);
    if (squares[randomColumn][randomRow].number == -1) {
      i -= 1;
    } else {
      squares[randomColumn][randomRow].number = -1;
    }
  }

  // generates the neighbour cells
  for (let column = 0; column < 15; column++) {
    for (let row = 0; row < 15; row++) {
      let surroundingArea = {
        topColumn: 0,
        bottomColumn: 0,
        leftRow: 0,
        rightRow: 0
      };

      // sets number of neighbour cells
      surroundingArea.topColumn = Math.max(column - 1, 0);
      surroundingArea.bottomColumn = Math.min(column + 1, squares.length - 1);
      surroundingArea.leftRow = Math.max(row - 1, 0);
      surroundingArea.rightRow = Math.min(row + 1, squares[column].length - 1);

      // controls number of neighbour cells
      if (squares[column][row].number !== -1) {
        for (
          let column1 = surroundingArea.topColumn;
          column1 < surroundingArea.bottomColumn + 1;
          column1++
        ) {
          for (
            let row1 = surroundingArea.leftRow;
            row1 < surroundingArea.rightRow + 1;
            row1++
          ) {
            if (squares[column1][row1].number == -1) {
              squares[column][row].number++;
            }
          }
        }
      }
    }
  }
};

// makes and renders the squares within the board
const makeIndividualSquare = (left, top, idY, idX) => {
  let newSquare = document.createElement("div");
  newSquare.style.left = left + "px";
  newSquare.style.top = top + "px";
  newSquare.setAttribute("class", "squares");
  newSquare.setAttribute(
    "onclick",
    "buttonWasClicked([" + idY + "," + idX + "])"
  );
  document.getElementById("board").appendChild(newSquare);
  return newSquare;
};

// draws/reveals the clues on the board on a click function
const buttonWasClicked = yAndX => {
  let row = yAndX[1];
  let column = yAndX[0];
  let clickStage = squares[column][row].clickStage;
  let squareNumber = squares[column][row].number;

  if (playerClickStage == "Clicking // Press to flag") {
    if (clickStage == "clickable" && squareNumber !== -1) {
      squares[column][row].draw.innerHTML = squares[column][row].number;
      squares[column][row].clickStage = "Done!";
      if (squareNumber == 0) {
        let surroundingArea = {
          topColumn: 0,
          bottomColumn: 0,
          leftRow: 0,
          rightRow: 0
        };

        // sets number of neighbour cells
        surroundingArea.topColumn = Math.max(column - 1, 0);
        surroundingArea.bottomColumn = Math.min(column + 1, squares.length - 1);
        surroundingArea.leftRow = Math.max(row - 1, 0);
        surroundingArea.rightRow = Math.min(
          row + 1,
          squares[column].length - 1
        );

        // controls number of neighbour cells
        for (
          let column1 = surroundingArea.topColumn;
          column1 < surroundingArea.bottomColumn + 1;
          column1++
        ) {
          for (
            let row1 = surroundingArea.leftRow;
            row1 < surroundingArea.rightRow + 1;
            row1++
          ) {
            setTimeout(squares[column1][row1].draw.click(), 1);
          }
        }
      }
    }
  }
  if (clickStage == "clickable" && squareNumber == -1) {
    alert("Game over!");
    location.reload();
    return 1;
  }
  squares[column][row].draw.style.color = "#000000";

  // sets function of buttons from clicking or flagging
  if (playerClickStage == "Flagging // Press to click") {
    if (squares[column][row].clickStage == "flagged") {
      squares[column][row].clickStage = "clickable";
      squares[column][row].draw.style.backgroundColor = "#CCCCCC";
    } else if (
      squares[column][row].clickStage == "clickable" &&
      numberOfFlags < 40
    ) {
      squares[column][row].clickStage = "flagged";
      squares[column][row].draw.style.backgroundColor = "#FF0000";
    }

    numberOfFlags = 0;
    let squaresNotClicked = squares.length * squares[0].length;
    for (let column = 0; column < squares.length; column++) {
      for (let row = 0; row < squares[column].length; row++) {
        if (squares[column][row].clickStage == "flagged") {
          numberOfFlags++;
        }
        if (squares[column][row].clickStage !== "clickable") {
          squaresNotClicked--;
        }
      }
      if (squaresNotClicked == 0) {
        alert("You win!");
        playerClickStage = "Won!";
      }
    }
    flagsLeft.innerHTML = "Number of flags left: " + (40 - numberOfFlags);
  }
};

// generates the functions of the button for clicking and flagging
const buttonClicked = () => {
  if (playerClickStage == "Clicking // Press to flag") {
    playerClickStage = "Flagging // Press to click";
    clickCells.innerHTML = "Flagging // Press to click";
  } else if (playerClickStage == "Flagging // Press to click") {
    playerClickStage = "Clicking // Press to flag";
    clickCells.innerHTML = "Clicking // Press to flag";
  }
};

makeSquares();
