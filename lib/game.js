const Background = require('./background');
const Ship = require('./ship');
const Bullet = require('./bullet');
const Player = require('./player');
const EnemyShip = require('./enemy_ship');
const SmallEnemy = require('./small_enemy');
const MediumEnemy = require('./medium_enemy');
const LargeEnemy = require('./large_enemy');
const Explosion = require('./explosion');
const Score = require('./score');
const Util = require('./util');

class Game {
	constructor({ gameCanvas, gameCtx, midgroundCtx, backgroundCtx }) {
		this.gameCanvas = gameCanvas;
		this.ctx = gameCtx;

		this.midgroundCtx = midgroundCtx;
		this.backgroundCtx = backgroundCtx;

		this.frameIndex = 1;
		this.minSpawnRateFrames = 50;
		this.spawnChance = 0.2;

		this.enemies = [];
		this.bullets = [];
		this.explosions = [];

		this.generateBackground();
		this.player = new Player({ game: this });

		this.level = 1;
		this.score = new Score({ game: this });
		this.step = this.step.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.spawnEnemy = this.spawnEnemy.bind(this);
		this.checkCollisions = this.checkCollisions.bind(this);
		this.remove = this.remove.bind(this);
		this.add = this.add.bind(this);
		this.allObjects = this.allObjects.bind(this);
		this.generateBackground = this.generateBackground.bind(this);
		this.reset = this.reset.bind(this);

		this.gameCanvas.focus();

		this.movementListener = this.gameCanvas.addEventListener('keydown', this.handleKeyDown);
		this.weaponListener = this.gameCanvas.addEventListener(
			'keypress',
			Util.throttle(this.handleKeyPress, this.player.weaponLockout)
		);
	}

	generateBackground() {
		this.background = new Background({ ctx: this.backgroundCtx, type: 'background', level: this.level });
		this.midground = new Background({ ctx: this.midgroundCtx, type: 'midground', level: this.level });
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
			this.score.addPoints(obj.basePoints);
			this.add(new Explosion({ pos: obj.pos, game: this }));
		} else if (obj instanceof Explosion) {
			this.explosions = this.explosions.filter(explosion => explosion != obj);
		} else if (obj instanceof Player) {
			alert(`You died :( Score: ${this.score.currentScore}`);
			this.reset();
		}
	}

	step() {
		requestAnimationFrame(this.step);
		this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
		this.allMovingObjects().forEach(obj => obj.move());
		this.checkCollisions();
		this.background.draw();
		this.midground.draw();
		this.score.draw(this.ctx);
		this.allObjects().forEach(obj => obj.draw(this.ctx));

		if (this.frameIndex % this.minSpawnRateFrames === 0 && Math.random() < this.spawnChance) {
			this.spawnEnemy();
		}
		// if (this.score.currentScore > 5000) {
		// 	alert(`You win! Score: ${this.score.currentScore}`);
		// 	this.reset();
		// }
		if (this.score.currentScore / 1000 >= this.level) {
			this.level++;
			this.generateBackground();
		}
		if (this.frameIndex === 10000) this.frameIndex = 0;
		this.frameIndex++;
	}

	spawnEnemy() {
		let enemy;
		const rand = Math.random();
		if (rand < 0.5) {
			const pos = [800, Math.floor(Math.random() * (this.gameCanvas.height - SmallEnemy.HEIGHT + 1))];
			enemy = new SmallEnemy({ game: this, pos });
		} else if (rand < 0.8) {
			const pos = [800, Math.floor(Math.random() * (this.gameCanvas.height - MediumEnemy.HEIGHT + 1))];
			enemy = new MediumEnemy({ game: this, pos });
		} else {
			const pos = [800, Math.floor(Math.random() * (this.gameCanvas.height - LargeEnemy.HEIGHT + 1))];
			enemy = new LargeEnemy({ game: this, pos });
		}
		this.add(enemy);
	}

	checkCollisions() {
		this.allObjects().forEach((obj1, startIdx) => {
			this.allObjects()
				.slice(startIdx + 1) //Prevent checking multiple times
				.forEach(obj2 => {
					if (obj1.isCollidedWith(obj2) && obj1.direction === -1 * obj2.direction) {
						obj1.remove();
						obj2.remove();
					}
				});
		});
	}

	// Clear enemies, bullets, and explosions. Reset score to 0 and level to 1. Generate level 1 backgrounds.
	reset() {
		this.enemies = [];
		this.bullets = [];
		this.explosions = [];
		this.score.currentScore = 0;
		this.level = 1;
		this.generateBackground();
	}
}

module.exports = Game;
