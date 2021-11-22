import Board from './board.js'


class Main {
	constructor () {
		this.board = new Board()
		
		
		this.myCanvas = document.getElementById("myCanvas");
		this.myCanvasCtx = myCanvas.getContext('2d');
		this.myCanvasLeft = this.myCanvas.offsetLeft + this.myCanvas.clientLeft
		this.myCanvasTop = this.myCanvas.offsetTop + this.myCanvas.clientTop
		
		this.canvasWidth = this.myCanvasCtx.canvas.clientWidth;
		this.canvasHeight = this.myCanvasCtx.canvas.clientHeight;
		this.cellWidth = 50;
		
		this.canvasWidthCellWidth = this.canvasWidth / this.cellWidth;
		this.canvasHeightCellHeight = this.canvas.Height / this.cellWidth;
		
		this.isRunning = true;
		this.delay = 300;	
	}
	
	initializeBoard() {
		this.board.createBoard();
		this.board.setCellNeighbours();
		
		this.myCanvas.addEventListener('click', function(event) {
			var x = event.pageX - this.myCanvasLeft;
			var y = event.pageY - this.myCanvasTop;
			
			this.board.board.forEach(function(row) {
				row.forEach(function(cell) {
					if (y > cell.y*cell.width && y < cell.y*cell.width + cell.width
					&& x > cell.x*cell.width && x < cell.x*cell.width + cell.width) {
						cell.drawState();
						this.myCanvasCtx.clearRect(0,0, this.myCanvas.width, this.myCanvas.height);
						this.board.boardUpdate();
					}
				})
			})
		}, false);
	    
		this.board.setPrevState();
		this.board.Update(this.myCanvasCtx);
	}
	
	updateGame() {
		this.myCanvasCtx.clearRect(0,0, this.myCanvas.width, this.myCanvas.height);
		this.board.nextState();
		this.board.setPrevState();
		this.board.boardUpdate(this.myCanvasCtx);
	}
	
	mainLoop() {
		if (this.isRunning) {
			this.updateGame();
			setTimeout( function() {
				window.requestAnimationFrame(this.mainLoop);
			}, this.delay);
			
			
		}
		setPrevState();
		initializeBoard()
		window.requestAnimationFrame(mainLoop);
	}
	
	runGame() {
		window.requestAnimationFrame(mainLoop);
	}
}



var mainGame = new Main();

function pauseLoop() {
	mainGame.isRunning = !mainGame.isRunning;
	window.requestAnimationFrame(mainGame.mainLoop);
}

mainGame.initializeBoard();
mainGame.runGame();

