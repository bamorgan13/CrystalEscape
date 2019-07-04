class Score {
	constructor({ game }) {
		this.currentScore = 0;
		this.framesDrawn = 0;
		this.multiplier = 1;
		this.game = game;
	}

	draw(ctx) {
		ctx.font = '20px Arial';
		ctx.fillStyle = 'white';
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.fillText('SCORE:', 10, 20);
		ctx.strokeText('SCORE:', 10, 20);
		ctx.fillText(this.currentScore, 90, 20);
		ctx.strokeText(this.currentScore, 90, 20);
		ctx.fillText('LEVEL:', 10, 50);
		ctx.strokeText('LEVEL:', 10, 50);
		ctx.fillText(this.game.level, 80, 50);
		ctx.strokeText(this.game.level, 80, 50);

		this.framesDrawn++;
		if (this.framesDrawn % 10 === 0) this.currentScore += this.multiplier;
		this.currentScore = Math.floor(this.currentScore);
	}

	addPoints(basePoints) {
		this.currentScore += basePoints * this.multiplier;
	}
}

module.exports = Score;
