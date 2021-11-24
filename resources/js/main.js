class Main {
	constructor () {
		this.Board = new Board()
		
		
		this.myCanvas = document.getElementById("myCanvas");
		this.myCanvasCtx = myCanvas.getContext('2d');
		this.myCanvasLeft = this.myCanvas.offsetLeft + this.myCanvas.clientLeft
		this.myCanvasTop = this.myCanvas.offsetTop + this.myCanvas.clientTop
		
		this.canvasWidth = this.myCanvasCtx.canvas.clientWidth;
		this.canvasHeight = this.myCanvasCtx.canvas.clientHeight;
		this.cellWidth = 50;
		
		this.canvasWidthCellWidth = this.canvasWidth / this.cellWidth;
		this.canvasHeightCellHeight = this.canvasHeight / this.cellWidth;
		
		this.isRunning = true;
		this.delay = 300;	
	}
	
	initializeBoard() {
		this.Board.createBoard();
		this.Board.setCellNeighbours();
		
		var gameBoard = this.Board.board
		this.myCanvas.addEventListener('click', (event) => {
			var x = event.pageX - this.myCanvasLeft;
			var y = event.pageY - this.myCanvasTop;
			
			gameBoard.forEach((row) => {
				row.forEach((cell) => {
					if (y > cell.y*cell.width && y < cell.y*cell.width + cell.width
					&& x > cell.x*cell.width && x < cell.x*cell.width + cell.width) {
						cell.drawState();
						this.myCanvasCtx.clearRect(0,0, this.myCanvas.width, this.myCanvas.height);
						this.Board.boardUpdate(this.myCanvasCtx);
					}
				})
			})
		}, false);
	    
		this.Board.setPrevState();
		this.Board.boardUpdate(this.myCanvasCtx);
	}
	
	updateGame() {
		this.myCanvasCtx.clearRect(0,0, this.myCanvas.width, this.myCanvas.height);
		this.Board.nextState();
		this.Board.setPrevState();
		this.Board.boardUpdate(this.myCanvasCtx);
	}
	
	
	runGame() {
		var self = this
		
		function mainLoop() {
			if (self.isRunning) {
				self.updateGame();
				setTimeout( () => {
					window.requestAnimationFrame(mainLoop);
				}, self.delay);
			}
		}
		window.requestAnimationFrame(mainLoop)
		
		//this.mainLoop()
		//window.requestAnimationFrame(() => this.mainLoop);
	}
}



var mainGame = new Main();
mainGame.initializeBoard();

function pauseLoop() {
	mainGame.isRunning = !mainGame.isRunning;
	mainGame.runGame()
}

console.log("runGame")
mainGame.runGame();



