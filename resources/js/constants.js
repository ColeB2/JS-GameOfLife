const CANVAS = document.getElementById("myCanvas")
const CTX = CANVAS.getContext("2d")
const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;


var CELL_WIDTH = 25;

var BOARD_WIDTH = CANVAS_WIDTH / CELL_WIDTH;
var BOARD_HEIGHT = CANVAS_HEIGHT / CELL_WIDTH;