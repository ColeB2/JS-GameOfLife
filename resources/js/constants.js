export const CANVAS = document.getElementById("myCanvas")
export const CTX = CANVAS.getContext("2d")
export const CANVAS_LEFT = CANVAS.offsetLeft + CANVAS.clientLeft
export const CANVAS_TOP = CANVAS.offsetTop + CANVAS.clientTop
export const CANVAS_WIDTH = CANVAS.width;
export const CANVAS_HEIGHT = CANVAS.height;
export const DELAY = 300;


export const CELL_WIDTH = 25;

export const BOARD_WIDTH = CANVAS_WIDTH / CELL_WIDTH;
export const BOARD_HEIGHT = CANVAS_HEIGHT / CELL_WIDTH;