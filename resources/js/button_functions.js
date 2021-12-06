


export function pauseLoop() {
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

export function resetBoard() {
	document.getElementById('reset')
	mainGame.board.resetState()
	mainGame.updateGame();
}

export function randomBoard() {
	mainGame.board.randomState();
	mainGame.updateGame();
}