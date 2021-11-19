

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
				var cell = new Cell(i, j, 50, false);
				//50 -- cell width --> import a const for it?
				row.push(cell)
			}
			this.board.push(row)
		}
	}
}