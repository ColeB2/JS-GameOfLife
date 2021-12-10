import {GameOfLife} from './gol.js'
import {GALAXY} from './states.js'


const mainGame = new GameOfLife();
mainGame.initializeBoard();
const pauseButton = document.getElementById('pause');

const rangeSlider = document.getElementById('myRange');
const output = document.getElementById('sliderValue');
output.innerHTML = rangeSlider.value;

rangeSlider.oninput = function() {
	output.innerHTML = this.value;
	mainGame.delay = this.value;
}

function pauseLoop() {
	if (mainGame.isRunning) {
		pauseButton.innerText = 'Start';
		pauseButton.classList.remove('button-paused')
	} else {
		pauseButton.innerText = 'Pause';
		pauseButton.classList.add('button-paused')
	}
	
	mainGame.isRunning = !mainGame.isRunning;
	mainGame.runGame()
}

function resetBoard() {
	document.getElementById('reset')
	mainGame.board.resetState()
	mainGame.generation = 0;
	mainGame.updateCounter();
	mainGame.updateVisuals();
}

function randomBoard() {
	mainGame.board.randomState();
	mainGame.generation = 0;
	mainGame.updateCounter();
	mainGame.updateVisuals();
}

function loadState(boardState) {
	mainGame.board.loadState(boardState);
	mainGame.generation = 0;
	mainGame.updateCounter();
	mainGame.updateVisuals();
}


window.mainGame = mainGame
window.pauseLoop = pauseLoop
window.resetBoard = resetBoard
window.randomBoard = randomBoard
window.loadState = loadState
window.rangeSlider = rangeSlider

mainGame.runGame();