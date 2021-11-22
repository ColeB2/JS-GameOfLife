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
		this.myCanvas.addEventListener('click', function(event) {
			var x = event.pageX - this.myCanvasLeft;
			var y = event.pageY - this.myCanvasTop;
			
			gameBoard.forEach(function(row) {
				row.forEach(function(cell) {
					if (y > cell.y*cell.width && y < cell.y*cell.width + cell.width
					&& x > cell.x*cell.width && x < cell.x*cell.width + cell.width) {
						cell.drawState();
						this.myCanvasCtx.clearRect(0,0, this.myCanvas.width, this.myCanvas.height);
						this.Board.boardUpdate();
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
	
	mainLoop() {
		if (this.isRunning) {
			this.updateGame();
			setTimeout( function() {
				window.requestAnimationFrame(this.mainLoop);
			}, this.delay);
			
			
		}
		setPrevState();
		initializeBoard()
		window.requestAnimationFrame(this.mainLoop);
	}
	
	runGame() {
		window.requestAnimationFrame(this.mainLoop);
	}
}



var mainGame = new Main();
mainGame.initializeBoard();

var isRunning = true;

function mainLoop() {
	if (isRunning) {
		mainGame.updateGame();
		setTimeout( function() {
			window.requestAnimationFrame(mainGame.mainLoop);
		}, mainGame.delay);
	}
}


function pauseLoop() {
	mainGame.isRunning = !mainGame.isRunning;
	window.requestAnimationFrame(mainGame.mainLoop);
}

//mainGame.runGame();



