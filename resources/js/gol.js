import {Board} from './board.js'
import * as cons from './constants.js'


export class GameOfLife {
	constructor () {
		this.board = new Board(cons.BOARD_WIDTH, cons.BOARD_HEIGHT)
		this.isRunning = false;
		this.delay = cons.DELAY;
		this.generation = 0;
		this.lastChange = null;
	}
	
	//Mouse Functions:
	mouseClick(gameBoard) {
		cons.CANVAS.addEventListener('click', (event) => {
			const x = event.pageX - cons.CANVAS_LEFT;
			const y = event.pageY - cons.CANVAS_TOP;
			
			gameBoard.forEach((row) => {
				row.forEach((cell) => {
					if (y > cell.y*cell.width && y < cell.y*cell.width + cell.width
					&& x > cell.x*cell.width && x < cell.x*cell.width + cell.width) {
						cell.drawState();
						cons.CTX.clearRect(0,0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
						this.board.boardUpdate(cons.CTX);
					}
				})
			})
		}, false);
		
	}
	
	
	mouseDownMouseMove(gameBoard) {
		cons.CANVAS.addEventListener('mousedown', (event) => {
			cons.CANVAS.addEventListener('mousemove', (event) => {
				const xx = event.pageX - cons.CANVAS_LEFT;
				const yy = event.pageY - cons.CANVAS_TOP;
				
				gameBoard.forEach((row) => {
					row.forEach((cell) => {
						if (yy > cell.y*cell.width && yy < cell.y*cell.width + cell.width
						&& xx > cell.x*cell.width && xx < cell.x*cell.width + cell.width) {
							cell.drawState();
							cons.CTX.clearRect(0,0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
							this.board.boardUpdate(cons.CTX);
						}
					})
				})
				
			},false);
			
		}, false);
	}
	
	mouseMoveFunction(gameBoard) {
		const x = event.pageX - cons.CANVAS_LEFT;
		const y = event.pageY - cons.CANVAS_TOP;
			gameBoard.forEach((row) => {
				row.forEach((cell) => {
					if (y > cell.y*cell.width
						&& y < cell.y*cell.width + cell.width
						&& x > cell.x*cell.width
						&& x < cell.x*cell.width + cell.width
						&& this.lastChange != cell) {
							this.lastChange = cell
							cell.drawState();
							cons.CTX.clearRect(0,0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
							this.board.boardUpdate(cons.CTX);
						}
				})
			})
		}
	
	
	mouseMoveWhilstDown(whileMove) {
		var endMove = function() {
			cons.CANVAS.removeEventListener('mousemove', whileMove);
			cons.CANVAS.removeEventListener('mouseup', endMove);
		}
		
		cons.CANVAS.addEventListener('mousedown', (event) => {
			event.stopPropagation();
			cons.CANVAS.addEventListener('mousemove', whileMove);
			cons.CANVAS.addEventListener('mouseup', endMove);
		})
	}
	
	initializeBoard() {
		this.board.createBoard();
		this.board.setCellNeighbours();
		
		const gameBoard = this.board.board
		
		//Mouse Controls
		this.mouseClick(gameBoard);
		//this.mouseDownMouseMove(gameBoard);
		
		console.log(event)
		console.log(window.event)
		this.mouseMoveWhilstDown((event) => this.mouseMoveFunction(gameBoard))
		/* this.mouseMoveWhilstDown(
		    (event) => {
				const x = event.pageX - cons.CANVAS_LEFT;
				const y = event.pageY - cons.CANVAS_TOP;
				gameBoard.forEach((row) => {
					row.forEach((cell) => {
						if (y > cell.y*cell.width
						    && y < cell.y*cell.width + cell.width
						    && x > cell.x*cell.width
						    && x < cell.x*cell.width + cell.width
						    && this.lastChange != cell) {
							    this.lastChange = cell
							    cell.drawState();
							    cons.CTX.clearRect(0,0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
							    this.board.boardUpdate(cons.CTX);
						}
					})
				})
			}) */
		this.board.setPrevState();
		this.board.boardUpdate(cons.CTX);
	}
	
	updateLogic() {
		this.board.nextState();
		this.board.setPrevState();
		this.generation ++;
		this.updateCounter();
	}
	
	updateVisuals() {
		cons.CTX.clearRect(0,0, cons.CANVAS_WIDTH, cons.CANVAS_HEIGHT);
		this.board.boardUpdate(cons.CTX);
	}
	
	updateGame() {
		this.updateLogic();
		this.updateVisuals();
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