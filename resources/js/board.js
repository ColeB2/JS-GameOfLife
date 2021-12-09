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
		for (let y = 0; y <= boardState.length - 1 ; y++) {
			console.log("j:", j)
			console.log("y:", y)
			for (let x = 0; x <= boardState[y].length - 1; x ++) {
				console.log("i", i)
				console.log("x:",x)
				console.log(boardState[y][x])
				
				if (boardState[y][x] === 1) {
					this.board[y][x].state = true
					this.board[y][x].prevState = true
				} else {
					this.board[y][x].state = false
					this.board[y][x].prevState = false
				}
				
				console.log(this.board)
				console.log(boardState)
				
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