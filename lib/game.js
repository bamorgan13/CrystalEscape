import Background from './background';

export default class Game {
	constructor(gameCanvas, gameCtx, midgroundCtx, backgroundCtx) {
		this.gameCanvas = gameCanvas;
		this.ctx = gameCtx;

		this.generateBackground(backgroundCtx, midgroundCtx);
		this.draw = this.draw.bind(this);
	}

	generateBackground(backgroundCtx, midgroundCtx) {
		this.background = new Background(backgroundCtx, 'background');
		this.midground = new Background(midgroundCtx, 'midground');
	}

	draw() {
		requestAnimationFrame(this.draw);
		this.background.draw();
		this.midground.draw();
	}
}
