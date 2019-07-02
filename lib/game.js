const Background = require('./background');

class Game {
	constructor(gameCanvas, gameCtx, midgroundCtx, backgroundCtx) {
		this.gameCanvas = gameCanvas;
		this.ctx = gameCtx;

		this.generateBackground(backgroundCtx, midgroundCtx);
		this.draw = this.draw.bind(this);
	}

	generateBackground(backgroundCtx, midgroundCtx) {
		const level = Math.floor(Math.random() * 5) + 1;
		this.background = new Background(backgroundCtx, 'background', level);
		this.midground = new Background(midgroundCtx, 'midground', level);
	}

	draw() {
		requestAnimationFrame(this.draw);
		this.background.draw();
		this.midground.draw();
	}
}

module.exports = Game;
