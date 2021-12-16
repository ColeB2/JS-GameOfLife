import {GameOfLife} from './gol.js'
import {TOAD, GALAXY} from './states.js'


const mainGame = new GameOfLife();
mainGame.initializeBoard();
//const pauseButton = document.getElementById('pause');

//Delay Range Slider
function gameDelay() {
	delayOutput.innerHTML = this.value;
	mainGame.delay = this.value;	
}

const delayRange = document.getElementById('delayRange');
const delayOutput = document.getElementById('delayValue');
delayOutput.innerHTML = delayRange.value;
delayRange.addEventListener('input', gameDelay, false)


//Pause Button
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

const pauseButton = document.getElementById('pause')
pauseButton.addEventListener('click', pauseLoop, false)


//Reset Button
function resetBoard() {
	mainGame.board.resetState()
	mainGame.generation = 0;
	mainGame.updateCounter();
	mainGame.updateVisuals();
}

const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', resetBoard, false)

function randomBoard() {
	mainGame.board.randomState();
	mainGame.generation = 0;
	mainGame.updateCounter();
	mainGame.updateVisuals();
}

const loadableBoardStates = {
	"toad": TOAD,
	"galaxy": GALAXY,
}

function loadState(boardState) {
	mainGame.board.loadState(loadableBoardStates[boardState]);
	mainGame.generation = 0;
	mainGame.updateCounter();
	mainGame.updateVisuals();
}


window.mainGame = mainGame
window.randomBoard = randomBoard
window.loadState = loadState
window.rangeSlider = rangeSlider
window.gameDelay = gameDelay

mainGame.runGame();