const Background = require('./background');
const Ship = require('./ship');
const Bullet = require('./bullet');
const Player = require('./player');
const EnemyShip = require('./enemy_ship');
const Util = require('./util');

class Game {
	constructor({ gameCanvas, gameCtx, midgroundCtx, backgroundCtx }) {
		this.gameCanvas = gameCanvas;
		this.ctx = gameCtx;

		this.enemies = [];
		this.bullets = [];

		this.generateBackground(backgroundCtx, midgroundCtx);
		this.player = new Player({ game: this });

		this.draw = this.draw.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.gameCanvas.focus();
		this.movementListener = this.gameCanvas.addEventListener('keydown', this.handleKeyDown);
		this.weaponListener = this.gameCanvas.addEventListener(
			'keypress',
			Util.throttle(this.handleKeyPress, this.player.weaponLockout)
		);
	}

	generateBackground(backgroundCtx, midgroundCtx) {
		const level = Math.floor(Math.random() * 5) + 1; //Randomize level for testing
		this.background = new Background({ ctx: backgroundCtx, type: 'background', level });
		this.midground = new Background({ ctx: midgroundCtx, type: 'midground', level });
	}

	handleKeyDown(e) {
		if (e.code === 'KeyW' || e.code === 'ArrowUp') {
			this.player.boost('up');
		} else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
			this.player.boost('down');
		} else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
			this.player.boost('left');
		} else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
			this.player.boost('right');
		}
	}

	handleKeyPress(e) {
		if (e.code === 'Space') this.player.fire();
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
		this.player.move();
		this.bullets.forEach(bullet => bullet.move());
	}
}

module.exports = Game;
