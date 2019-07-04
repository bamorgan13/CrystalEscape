const Background = require('./background');
const Ship = require('./ship');
const Bullet = require('./bullet');
const Player = require('./player');
const EnemyShip = require('./enemy_ship');
const SmallEnemy = require('./small_enemy');
const MediumEnemy = require('./medium_enemy');
const LargeEnemy = require('./large_enemy');
const Explosion = require('./explosion');
const Powerup = require('./powerup');
const Score = require('./score');
const Util = require('./util');

class Game {
	constructor({ gameCanvas, gameCtx, midgroundCtx, backgroundCtx }) {
		this.gameCanvas = gameCanvas;
		this.ctx = gameCtx;

		this.midgroundCtx = midgroundCtx;
		this.backgroundCtx = backgroundCtx;

		this.frameIndex = 1;
		this.spawnRateFrames = 200;
		this.minSpawnRateFrames = 50;
		this.spawnChance = 0.3;

		this.enemies = [];
		this.bullets = [];
		this.explosions = [];
		this.powerups = [];

		this.generateBackground();
		this.player = new Player({ game: this });

		this.level = 1;
		this.score = new Score({ game: this });
		this.step = this.step.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);

		this.gameCanvas.focus();

		this.gameCanvas.addEventListener('keydown', this.handleKeyDown);
		this.throttledPress = Util.throttle(this.handleKeyPress, this.player.weaponLockout);
		this.gameCanvas.addEventListener('keypress', this.throttledPress);
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
		return [].concat(this.player, ...this.bullets, ...this.enemies, ...this.explosions, ...this.powerups);
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
		} else if (obj instanceof Powerup) {
			this.powerups.push(obj);
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
			if (Math.random() < 1) this.add(new Powerup({ pos: obj.pos, game: this, index: Math.floor(Math.random() * 4) }));
		} else if (obj instanceof Powerup) {
			this.powerups = this.powerups.filter(powerup => powerup != obj);
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

		if (this.frameIndex % this.spawnRateFrames === 0 && Math.random() < this.spawnChance) {
			this.spawnEnemy();
		}

		if (this.score.currentScore / 1000 >= this.level) this.levelUp(); //Testing - automatic levelup after 1000 points

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
		console.log('Spawning', enemy);
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
					} else if (obj1.isCollidedWith(obj2) && obj1 instanceof Player && obj2 instanceof Powerup) {
						console.log(obj2.type);
						this.player.addPowerup(obj2);
						obj2.remove();
					}
				});
		});
	}

	// Clear enemies, bullets, and explosions. Reset score to 0 and level and multiplier to 1. Generate level 1 backgrounds.
	reset() {
		this.enemies = [];
		this.bullets = [];
		this.explosions = [];
		this.powerups = [];
		this.score.currentScore = 0;
		this.score.multiplier = 1;
		this.spawnChance = 0.3;
		this.spawnRateFrames = 200;
		this.level = 1;
		this.generateBackground();
	}

	levelUp() {
		this.level++;
		this.score.multiplier += 0.5;
		this.spawnChance = Math.min(this.spawnChance * 1.1, 1);
		this.spawnRateFrames = Math.max(Math.floor(this.spawnRateFrames * 0.9), this.minSpawnRateFrames);
		this.generateBackground();
	}
}

module.exports = Game;
