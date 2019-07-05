class Score {
	constructor({ game }) {
		this.currentScore = 0;
		this.framesDrawn = 0;
		this.multiplier = 1;
		this.game = game;
	}

	draw(ctx) {
		ctx.font = '18px Arial';
		ctx.fillStyle = 'red';
		ctx.fillText('SCORE:', 20, 200);
		ctx.fillText(this.currentScore, 100, 200);
		ctx.fillText('LEVEL:', 20, 230);
		ctx.fillText(this.game.level, 90, 230);

		this.framesDrawn++;
		if (this.framesDrawn % 10 === 0) this.currentScore += this.multiplier;
		this.currentScore = Math.floor(this.currentScore);
	}

	addPoints(basePoints) {
		this.currentScore += basePoints * this.multiplier;
	}
}

module.exports = Score;
