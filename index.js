let board = document.getElementById('board');
board.innerHTML += document.write('hello');

function Cell(row, column, mined, neighbourMineNumber) {
	return {
		id: row + '' + column,
		row: row,
		column: column,
		mined: mined,
		neighbourMineNumber: neighbourMineNumber
	};
}

let mine = '&#9881;';
let boardSize = 15;
let mines = 30;

// let getNumberColor = function(number) {
// 	let color = 'black';
// 	if (number === 1) {
// 		color = 'blue';
// 	} else if (number === 2) {
// 		color = 'green';
// 	} else if (number === 3) {
// 		color = 'red';
// 	} else if (number === 4) {
// 		color = 'orange';
// 	}
// 	return color;
// };

function Board(boardSize, mineNumber) {
	let board = {};
	for (let row = 0; row < boardSize; row++) {
		for (let column = 0; column < boardSize; column++) {
			board[row + '' + column] = Cell(row, column, false, 0);
		}
	}
	board = randomlyAssignMines(board, mineNumber);
	board = calculateNeighbourMineNumbers(board, boardSize);
	return board;
}

let randomlyAssignMines = function(board, mineNumber) {
	let mineCoordinates = [];
	for (let index = 0; index < mineCount; index++) {
		let randomRowCoordinate = getRandomInteger(0, boardSize);
		let randomColumnCoordinate = getRandomInteger(0, boardSize);
		let cell = randomRowCoordinate + '' + randomColumnCoordinat;
		while (mineCoordinates.includes(cell)) {
			randomRowCoordinate = getRandomInteger(0, boardSize);
			randomColumnCoordinate = getRandomInteger(0, boardSize);
			cell = randomRowCoordinate + '' + randomColumnCoordinate;
		}
		mineCoordinates.push(cell);
		board[cell].mined = true;
	}
	return board;
};

let calculateNeighbourMineNumbers = function(board, boardSize) {
	let cell;
	let neighbourMineNumber = 0;
	for (let row = 0; row < boardSize; row++) {
		for (let column = 0; column < boardSize; column++) {
			let id = row + '' + column;
			cell = board[id];
			if (!cell.mined) {
				let neighbours = getNeighbours(id);
				neighbourMineNumber = 0;
				for (let index = 0; index < neighbours.length; index++) {
					neighbourMineNumber += isMined(board, neighbours[index]);
				}
				cell.neighbourMineNumber = neighbourMineNumber;
			}
		}
	}
	return board;
};

let getNeighbours = function(id) {
	let row = parseInt(id[0]);
	let column = parseInt(id[1]);
	let neighbours = [];
	neighbours.push(row - 1 + '' + (column - 1));
	neighbours.push(row - 1 + '' + column);
	neighbours.push(row - 1 + '' + (column + 1));
	neighbours.push(row + '' + (column - 1));
	neighbours.push(row + '' + (column + 1));
	neighbours.push(row + 1 + '' + (column - 1));
	neighbours.push(row + 1 + '' + column);
	neighbours.push(row + 1 + '' + (column + 1));

	for (let index = 0; index < neighbours.length; index++) {
		if (neighbours[index].length > 2) {
			neighbours.splice(index, 1);
			index++;
		}
	}
	return neighbours;
};

let isMined = function(board, row, column) {
	let cell = board[row + '' + column];
	let mined = 0;
	if (typeof cell !== 'undefined') {
		mined = cell.mined ? 1 : 0;
	}
	return mined;
};

let getRandomInteger = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
};
