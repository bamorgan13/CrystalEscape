const Background = require('./background');
const Ship = require('./ship');
const Bullet = require('./bullet');
const Player = require('./player');
const EnemyShip = require('./enemy_ship');
const Explosion = require('./explosion');
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
		this.explosions = [];

		this.generateBackground(backgroundCtx, midgroundCtx);
		this.player = new Player({ game: this });

		this.step = this.step.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.spawnEnemy = this.spawnEnemy.bind(this);
		this.checkCollisions = this.checkCollisions.bind(this);
		this.remove = this.remove.bind(this);
		this.add = this.add.bind(this);
		this.allObjects = this.allObjects.bind(this);

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

	allObjects() {
		return [].concat(this.player, ...this.bullets, ...this.enemies, ...this.explosions);
	}

	allMovingObjects() {
		return [].concat(this.player, ...this.bullets, ...this.enemies);
	}

	add(obj) {
		if (obj instanceof Bullet) {
			this.bullets.push(obj);
		} else if (obj instanceof EnemyShip) {
			this.enemies.push(obj);
		} else if (obj instanceof Explosion) {
			this.explosions.push(obj);
		}
	}

	remove(obj) {
		if (obj instanceof Bullet) {
			this.bullets = this.bullets.filter(bullet => bullet != obj);
		} else if (obj instanceof EnemyShip) {
			this.enemies = this.enemies.filter(enemy => enemy != obj);
			this.add(new Explosion({ pos: obj.pos, game: this }));
		} else if (obj instanceof Explosion) {
			this.explosions = this.explosions.filter(explosion => explosion != obj);
		} else if (obj instanceof Player) {
			alert('You dead');
		}
	}

	step() {
		requestAnimationFrame(this.step);
		this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
		this.allMovingObjects().forEach(obj => obj.move());
		this.checkCollisions();
		this.background.draw();
		this.midground.draw();
		this.allObjects().forEach(obj => obj.draw(this.ctx));

		if (this.frameIndex % this.minSpawnRateFrames === 0 && Math.random() < this.spawnChance) {
			this.spawnEnemy();
		}
		if (this.frameIndex === 10000) this.frameIndex = 0;
		this.frameIndex++;
	}

	spawnEnemy() {
		const pos = [800, Math.floor(Math.random() * (this.gameCanvas.height - EnemyShip.HEIGHT + 1))];
		const enemy = new EnemyShip({ game: this, pos });
		this.add(enemy);
	}

	checkCollisions() {
		this.allObjects().forEach(obj1 => {
			this.allObjects().forEach(obj2 => {
				if (obj1 != obj2 && obj1.isCollidedWith(obj2) && obj1.direction === -1 * obj2.direction) {
					obj1.remove();
					obj2.remove();
				}
			});
		});
	}
}

module.exports = Game;
