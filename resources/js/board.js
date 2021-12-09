import {Cell} from './cell.js'
import {CELL_WIDTH} from './constants.js'

export class Board {
	constructor(width=10, height=10) {
		this.width = width;
		this.height = height;
		
		this.generation = 0
		this.board = [];	
	}
		
	
	createBoard() {
		for (var j = 0; j < this.height; j++) {
			var row = [];
			for (var i = 0; i < this.width; i++) {
				var cell = new Cell(i, j, CELL_WIDTH, false);
				//50 -- cell width --> import a const for it?
				row.push(cell);
			}
			this.board.push(row);
		}
	}
	
	setCellNeighbours() {
		var neighbourhood_board = this.board
		this.board.forEach((row) => {
			row.forEach((cell) => {
				cell.getNeighbours(this.board);
			})
		})
	}
	
	
	setPrevState() {
		this.board.forEach((row) => {
			row.forEach((cell) => {
				cell.prevState = cell.state;
			})
		})
	}
	
	resetState() {
		this.board.forEach((row) => {
			row.forEach((cell) => {
				cell.state = false;
				cell.prevState = false;
			})
		})
	}
	
	randomState() {
		this.board.forEach((row) => {
			row.forEach((cell) => {
				var randomBool = Math.random() < 0.5
				cell.state = randomBool;
				cell.prevState = randomBool;
			})
		})
	}
	
	loadState(boardState) {
		this.resetState()
		let i = Math.floor((this.width - boardState[0].length) / 2)
		let j = Math.floor((this.height - boardState.length) / 2)
		console.log(boardState)
		console.log(i)
		console.log(j)
		for (let y = 0; y <= boardState.length; y++) {
			console.log("y:")
			console.log(y)
			console.log("BoardState[y]", boardState[y])
			for (let x = 0; x <= boardState[y].length; x ++) {
				console.log("x")
				console.log(x)
				xCoord = i + x;
				this.board[j][x].state = boardState[y][x]
				this.board[j][x].prev_state = boardState[y][x]
				console.log(this.board[j][x])
				console.log(boardState[y][x])
				
			}
		}
		
	}
	
	
	nextState() {
		this.board.forEach((row) => {
			row.forEach((cell) => {
				cell.calculateState();
			})
		})
	}
		
	boardUpdate(canvasContext) {
		this.board.forEach((row) => {
			row.forEach((cell) => {
				cell.draw(canvasContext);
			});
		});
	}
}