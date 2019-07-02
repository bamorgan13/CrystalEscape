import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
	const backgroundCanvas = document.getElementById('background-canvas');
	const backgroundCtx = backgroundCanvas.getContext('2d');

	const midgroundCanvas = document.getElementById('midground-canvas');
	const midgroundCtx = midgroundCanvas.getContext('2d');

	const gameCanvas = document.getElementById('game-canvas');
	const gameCtx = gameCanvas.getContext('2d');

	gameCanvas.addEventListener('keyup', handleKeyPress);
	console.log('DOMContentLoaded');

	const game = new Game(gameCanvas, gameCtx, midgroundCtx, backgroundCtx);
	game.draw();
});

function handleKeyPress(e) {
	console.log(e.code, e.keyCode);
}
