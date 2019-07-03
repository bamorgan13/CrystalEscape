const Background = require('./background');
const Ship = require('./ship');
const Bullet = require('./bullet');
const EnemyShip = require('./enemy_ship');

class Game {
	constructor({ gameCanvas, gameCtx, midgroundCtx, backgroundCtx }) {
		this.gameCanvas = gameCanvas;
		this.ctx = gameCtx;

		this.enemies = [];
		this.bullets = [];

		this.generateBackground(backgroundCtx, midgroundCtx);
		this.player = new Ship({
			pos: [10, 200],
			vel: [0, 0],
			path: './assets/images/sprites/ship.png',
			scale: 2,
			width: 24,
			height: 16,
			game: this
		});

		this.draw = this.draw.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.gameCanvas.focus();
		this.gameCanvas.addEventListener('keypress', this.handleKeyPress);
		this.gameCanvas.addEventListener('keyup', this.handleKeyUp);
	}

	generateBackground(backgroundCtx, midgroundCtx) {
		const level = Math.floor(Math.random() * 5) + 1;
		this.background = new Background({ ctx: backgroundCtx, type: 'background', level });
		this.midground = new Background({ ctx: midgroundCtx, type: 'midground', level });
	}

	handleKeyPress(e) {
		const player = this.player;
		if (e.code === 'KeyW' || e.code === 'ArrowUp') {
			player.boost('up', 1);
		} else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
			player.boost('down', 1);
		}
		if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
			player.boost('left', 1);
		} else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
			player.boost('right', 1);
		}
	}

	handleKeyUp(e) {
		const player = this.player;
		if (e.code === 'Space') {
			player.fire();
		}
	}

	add(obj) {
		if (obj instanceof Bullet) {
			this.bullets.push(obj);
		}
	}

	draw() {
		requestAnimationFrame(this.draw);
		this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
		this.background.draw();
		this.midground.draw();
		this.player.draw(this.ctx);
		this.bullets.forEach(bullet => bullet.draw(this.ctx));
		// console.log(this.bullets);
		this.player.move();
		this.bullets.forEach(bullet => bullet.move());
	}
}

module.exports = Game;
