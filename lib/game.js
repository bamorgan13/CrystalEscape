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

		this.frameIndex = 1;
		this.minSpawnRateFrames = 50;
		this.spawnChance = 0.2;

		this.enemies = [];
		this.bullets = [];

		this.generateBackground(backgroundCtx, midgroundCtx);
		this.player = new Player({ game: this });

		this.step = this.step.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.spawnEnemy = this.spawnEnemy.bind(this);

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
		} else if (obj instanceof EnemyShip) {
			this.enemies.push(obj);
		}
	}

	step() {
		requestAnimationFrame(this.step);
		this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
		this.allObjects().forEach(obj => obj.move());
		this.background.draw();
		this.midground.draw();
		this.allObjects().forEach(obj => obj.draw(this.ctx));

		if (this.frameIndex % this.minSpawnRateFrames === 0 && Math.random() < this.spawnChance) {
			this.spawnEnemy();
			this.frameIndex = 1;
		}
		this.frameIndex++;
	}

	spawnEnemy() {
		const pos = [800, Math.floor(Math.random() * (this.gameCanvas.height - EnemyShip.HEIGHT + 1))];
		const enemy = new EnemyShip({ game: this, pos });
		this.add(enemy);
	}

	allObjects() {
		return [].concat(this.player, ...this.bullets, ...this.enemies);
	}

	remove(obj) {
		if (obj instanceof Bullet) {
			this.bullets = this.bullets.filter(bullet => bullet != obj);
		} else if (obj instanceof EnemyShip) {
			this.enemies = this.enemies.filter(enemy => enemy != obj);
		}
	}
}

module.exports = Game;
