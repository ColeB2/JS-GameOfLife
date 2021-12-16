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


//Random Board Button
function randomBoard() {
	mainGame.board.randomState();
	mainGame.generation = 0;
	mainGame.updateCounter();
	mainGame.updateVisuals();
}

const randomButton = document.getElementById('random')
randomButton.addEventListener('click', randomBoard, false)


//Load State Button
const loadableBoardStates = {
	"toad": TOAD,
	"galaxy": GALAXY,
}


function handleLoad() {
	mainGame.board.loadState(loadableBoardStates[this.id]);
	mainGame.generation = 0;
	mainGame.updateCounter();
	mainGame.updateVisuals();
}

const loadButtons = document.querySelectorAll('.load')
console.log(loadButtons)
for (let i = 0; i <= loadButtons.length; i++) {
	loadButtons[i].addEventListener('click', handleLoad, false)
}






window.mainGame = mainGame
mainGame.runGame();