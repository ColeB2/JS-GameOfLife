import {Board} from './board.js'
import * as cons from './constants.js'


export class GameOfLife {
	constructor () {
		this.board = new Board(cons.BOARD_WIDTH, cons.BOARD_HEIGHT)
		this.isRunning = false;
		this.delay = cons.DELAY;
		this.generation = 0;		
	}
	
	initializeBoard() {
		this.board.createBoard();
		this.board.setCellNeighbours();
		
		const gameBoard = this.board.board
		
		//Mouse Controls
		cons.CANVAS.addEventListener('click', (event) => {
			const x = event.pageX - cons.CANVAS_LEFT;
			const y = event.pageY - cons.CANVAS_TOP;
			
			gameBoard.forEach((row) => {
				row.forEach((cell) => {
					if (y > cell.y*cell.width && y < cell.y*cell.width + cell.width
					&& x > cell.x*cell.width && x < cell.x*cell.width + cell.width) {
						cell.drawState();
						CTX.clearRect(0,0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
						this.Board.boardUpdate(CTX);
					}
				})
			})
		}, false);
	    
		this.board.setPrevState();
		this.board.boardUpdate(cons.CTX);
	}
	
	updateGame() {
		cons.CTX.clearRect(0,0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
		this.board.nextState();
		this.generation ++;
		this.updateCounter();
		this.board.setPrevState();
		this.board.boardUpdate(cons.CTX);
	}
	
	updateCounter() {
		document.getElementById("generationValue").innerHTML = this.generation
	}
	
	
	runGame() {
		const self = this
		
		function mainLoop() {
			if (self.isRunning) {
				self.updateGame();
				setTimeout( () => {
					window.requestAnimationFrame(mainLoop);
				}, self.delay);
			}
		}
		window.requestAnimationFrame(mainLoop)
	}
}