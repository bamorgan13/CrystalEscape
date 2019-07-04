/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/crystal_escape.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/background.js":
/*!***************************!*\
  !*** ./lib/background.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Background {
	constructor({ ctx, type, level = 1 }) {
		this.ctx = ctx;
		if (type === 'background') {
			this.path = `./assets/images/backgrounds/level_${level % 5}/background.png`;
			this.scrollSpeed = 1 + level * 0.1;
		} else {
			this.path = `./assets/images/backgrounds/level_${level % 5}/midground.png`;
			this.scrollSpeed = 2 + level * 0.2;
		}
		this.x = 0;
		this.y = 0;
		this.img = new Image();
		this.img.src = this.path;
		this.img.onload = () => {
			this.scale = Math.min(
				this.ctx.canvas.width / this.img.naturalWidth,
				this.ctx.canvas.height / this.img.naturalHeight
			);
		};

		this.draw = this.draw.bind(this);
	}

	draw() {
		if (this.img.naturalWidth > 0) {
			this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			let i = 0;
			while (this.x + this.img.naturalWidth * this.scale * i < this.ctx.canvas.width) {
				this.ctx.drawImage(
					this.img,
					0,
					0,
					this.img.naturalWidth,
					this.img.naturalHeight,
					this.x + this.img.naturalWidth * this.scale * i,
					0,
					this.img.naturalWidth * this.scale,
					this.img.naturalHeight * this.scale
				);
				i++;
			}
			if (this.x <= -this.img.naturalWidth * this.scale) {
				this.x = 0;
			}
			this.x -= this.scrollSpeed;
		}
	}
}

module.exports = Background;


/***/ }),

/***/ "./lib/bullet.js":
/*!***********************!*\
  !*** ./lib/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");

class Bullet extends MovingObject {
	constructor(options) {
		super({ ...options, path: Bullet.PATH, spriteWidth: Bullet.SPRITE_WIDTH, spriteHeight: Bullet.SPRITE_HEIGHT });
	}
}

Bullet.PATH = './assets/images/sprites/bullet.png';
Bullet.SPRITE_HEIGHT = 8;
Bullet.SPRITE_WIDTH = 11;
Bullet.SCALE = 1;
Bullet.HEIGHT = Bullet.SPRITE_HEIGHT * Bullet.SCALE;
Bullet.WIDTH = Bullet.SPRITE_WIDTH * Bullet.SCALE;

module.exports = Bullet;


/***/ }),

/***/ "./lib/crystal_escape.js":
/*!*******************************!*\
  !*** ./lib/crystal_escape.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./lib/game.js");

document.addEventListener('DOMContentLoaded', () => {
	const backgroundCanvas = document.getElementById('background-canvas');
	const backgroundCtx = backgroundCanvas.getContext('2d');

	const midgroundCanvas = document.getElementById('midground-canvas');
	const midgroundCtx = midgroundCanvas.getContext('2d');

	const gameCanvas = document.getElementById('game-canvas');
	const gameCtx = gameCanvas.getContext('2d');

	const game = new Game({ gameCanvas, gameCtx, midgroundCtx, backgroundCtx });
	game.step();
});


/***/ }),

/***/ "./lib/enemy_ship.js":
/*!***************************!*\
  !*** ./lib/enemy_ship.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(/*! ./ship */ "./lib/ship.js");

class EnemyShip extends Ship {
	constructor(options) {
		super({
			deceleration: EnemyShip.DECELERATION,
			direction: EnemyShip.DIRECTION,
			...options
		});

		this.draw = this.draw.bind(this);
	}

	draw(ctx) {
		super.draw(ctx);
		if (this.framesDrawn % this.fireRate === 0) this.fire();
	}
}

EnemyShip.DIRECTION = -1;
EnemyShip.DECELERATION = 1;

module.exports = EnemyShip;


/***/ }),

/***/ "./lib/explosion.js":
/*!**************************!*\
  !*** ./lib/explosion.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const StaticObject = __webpack_require__(/*! ./static_object */ "./lib/static_object.js");

class Explosion extends StaticObject {
	constructor(options) {
		super({
			path: Explosion.PATH,
			scale: Explosion.SCALE,
			spriteWidth: Explosion.SPRITE_WIDTH,
			spriteHeight: Explosion.SPRITE_HEIGHT,
			spriteMaxX: Explosion.SPRITE_MAX_X,
			spriteMaxY: Explosion.SPRITE_MAX_Y,
			...options
		});

		this.draw = this.draw.bind(this);
	}

	draw(ctx) {
		super.draw(ctx);
		if (this.framesDrawn > Explosion.DURATION) this.remove();
	}
}

Explosion.PATH = './assets/images/sprites/explosion.png';
Explosion.SPRITE_MAX_X = 5;
Explosion.SPRITE_MAX_Y = 1;
Explosion.SCALE = 2;
Explosion.SPRITE_WIDTH = 16;
Explosion.SPRITE_HEIGHT = 16;
Explosion.WIDTH = Explosion.SPRITE_WIDTH * Explosion.SCALE;
Explosion.HEIGHT = Explosion.SPRITE_HEIGHT * Explosion.SCALE;
Explosion.DURATION = 200;

module.exports = Explosion;


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Background = __webpack_require__(/*! ./background */ "./lib/background.js");
const Ship = __webpack_require__(/*! ./ship */ "./lib/ship.js");
const Bullet = __webpack_require__(/*! ./bullet */ "./lib/bullet.js");
const Player = __webpack_require__(/*! ./player */ "./lib/player.js");
const EnemyShip = __webpack_require__(/*! ./enemy_ship */ "./lib/enemy_ship.js");
const SmallEnemy = __webpack_require__(/*! ./small_enemy */ "./lib/small_enemy.js");
const MediumEnemy = __webpack_require__(/*! ./medium_enemy */ "./lib/medium_enemy.js");
const LargeEnemy = __webpack_require__(/*! ./large_enemy */ "./lib/large_enemy.js");
const Explosion = __webpack_require__(/*! ./explosion */ "./lib/explosion.js");
const Score = __webpack_require__(/*! ./score */ "./lib/score.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

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
		this.levelUp = this.levelUp.bind(this);

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
					}
				});
		});
	}

	// Clear enemies, bullets, and explosions. Reset score to 0 and level and multiplier to 1. Generate level 1 backgrounds.
	reset() {
		this.enemies = [];
		this.bullets = [];
		this.explosions = [];
		this.score.currentScore = 0;
		this.score.multiplier = 1;
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


/***/ }),

/***/ "./lib/large_enemy.js":
/*!****************************!*\
  !*** ./lib/large_enemy.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EnemyShip = __webpack_require__(/*! ./enemy_ship */ "./lib/enemy_ship.js");

class LargeEnemy extends EnemyShip {
	constructor(options) {
		super({
			path: LargeEnemy.PATH,
			scale: LargeEnemy.SCALE,
			spriteWidth: LargeEnemy.SPRITE_WIDTH,
			spriteHeight: LargeEnemy.SPRITE_HEIGHT,
			spriteMaxX: LargeEnemy.SPRITE_MAX_X,
			spriteMaxY: LargeEnemy.SPRITE_MAX_Y,
			vel: LargeEnemy.STARTING_VARS.VEL,
			...options
		});
		this.topSpeed = LargeEnemy.STARTING_VARS.TOP_SPEED;
		this.fireRate = LargeEnemy.STARTING_VARS.FIRE_RATE;
		this.bulletScale = LargeEnemy.STARTING_VARS.BULLET_SCALE;
		this.bulletSpeed = LargeEnemy.STARTING_VARS.BULLET_SPEED;
		this.basePoints = LargeEnemy.STARTING_VARS.BASE_POINTS;
	}
}

LargeEnemy.PATH = './assets/images/sprites/enemy-large.png';
LargeEnemy.SPRITE_MAX_X = 1;
LargeEnemy.SPRITE_MAX_Y = 2;
LargeEnemy.SCALE = 2;
LargeEnemy.SPRITE_WIDTH = 32;
LargeEnemy.SPRITE_HEIGHT = 32;
LargeEnemy.WIDTH = LargeEnemy.SPRITE_WIDTH * LargeEnemy.SCALE;
LargeEnemy.HEIGHT = LargeEnemy.SPRITE_HEIGHT * LargeEnemy.SCALE;
LargeEnemy.STARTING_VARS = {
	TOP_SPEED: 6,
	VEL: [-0.5, 0],
	FIRE_RATE: 300,
	BULLET_SCALE: 4,
	BULLET_SPEED: 2,
	BASE_POINTS: 500
};

module.exports = LargeEnemy;


/***/ }),

/***/ "./lib/medium_enemy.js":
/*!*****************************!*\
  !*** ./lib/medium_enemy.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EnemyShip = __webpack_require__(/*! ./enemy_ship */ "./lib/enemy_ship.js");

class MediumEnemy extends EnemyShip {
	constructor(options) {
		super({
			path: MediumEnemy.PATH,
			scale: MediumEnemy.SCALE,
			spriteWidth: MediumEnemy.SPRITE_WIDTH,
			spriteHeight: MediumEnemy.SPRITE_HEIGHT,
			spriteMaxX: MediumEnemy.SPRITE_MAX_X,
			spriteMaxY: MediumEnemy.SPRITE_MAX_Y,
			vel: MediumEnemy.STARTING_VARS.VEL,
			...options
		});
		this.topSpeed = MediumEnemy.STARTING_VARS.TOP_SPEED;
		this.fireRate = MediumEnemy.STARTING_VARS.FIRE_RATE;
		this.bulletScale = MediumEnemy.STARTING_VARS.BULLET_SCALE;
		this.bulletSpeed = MediumEnemy.STARTING_VARS.BULLET_SPEED;
		this.basePoints = MediumEnemy.STARTING_VARS.BASE_POINTS;
	}
}

MediumEnemy.PATH = './assets/images/sprites/enemy-medium.png';
MediumEnemy.SPRITE_MAX_X = 1;
MediumEnemy.SPRITE_MAX_Y = 2;
MediumEnemy.SCALE = 2;
MediumEnemy.SPRITE_WIDTH = 16;
MediumEnemy.SPRITE_HEIGHT = 32;
MediumEnemy.WIDTH = MediumEnemy.SPRITE_WIDTH * MediumEnemy.SCALE;
MediumEnemy.HEIGHT = MediumEnemy.SPRITE_HEIGHT * MediumEnemy.SCALE;
MediumEnemy.STARTING_VARS = {
	TOP_SPEED: 6,
	VEL: [-0.8, 0],
	FIRE_RATE: 150,
	BULLET_SCALE: 1.5,
	BULLET_SPEED: 3,
	BASE_POINTS: 250
};

module.exports = MediumEnemy;


/***/ }),

/***/ "./lib/moving_object.js":
/*!******************************!*\
  !*** ./lib/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const StaticObject = __webpack_require__(/*! ./static_object */ "./lib/static_object.js");

class MovingObject extends StaticObject {
	constructor(options) {
		super(options);
		this.deceleration = options.deceleration || 1;
		this.direction = options.direction;
		this.vel = options.vel;
		this.speedMultiplier = options.speedMultiplier || 1;
	}

	move() {
		this.pos[0] += this.vel[0] * this.speedMultiplier;
		this.pos[1] += this.vel[1] * this.speedMultiplier;

		this.vel[0] *= this.deceleration;
		this.vel[1] *= this.deceleration;

		if (this.pos[0] < -1 * this.width || this.pos[0] > this.game.gameCanvas.width) this.remove();
	}
}

module.exports = MovingObject;


/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(/*! ./ship */ "./lib/ship.js");

class Player extends Ship {
	constructor(options) {
		super({
			path: Player.PATH,
			scale: Player.SCALE,
			spriteWidth: Player.SPRITE_WIDTH,
			spriteHeight: Player.SPRITE_HEIGHT,
			spriteMaxX: Player.SPRITE_MAX_X,
			spriteMaxY: Player.SPRITE_MAX_Y,
			pos: Player.STARTING_VARS.POS,
			vel: Player.STARTING_VARS.VEL,
			deceleration: Player.STARTING_VARS.DECELERATION,
			direction: Player.DIRECTION,
			...options
		});
		this.direction = 1;
		this.boostLevel = Player.STARTING_VARS.BOOST_LEVEL;
		this.topSpeed = Player.STARTING_VARS.TOP_SPEED;
		this.weaponLockout = Player.STARTING_VARS.WEAPON_LOCKOUT;
		this.bulletScale = Player.STARTING_VARS.BULLET_SCALE;
		this.bulletSpeed = Player.STARTING_VARS.BULLET_SPEED;
	}

	boost(direction) {
		switch (direction) {
			case 'up':
				this.vel[1] -= this.boostLevel;
				this.vel[1] = Math.max(this.vel[1], -1 * this.topSpeed);
				break;
			case 'down':
				this.vel[1] += this.boostLevel;
				this.vel[1] = Math.min(this.vel[1], this.topSpeed);
				break;
			case 'left':
				this.vel[0] -= this.boostLevel;
				this.vel[0] = Math.max(this.vel[0], -1 * this.topSpeed);
				break;
			case 'right':
				this.vel[0] += this.boostLevel;
				this.vel[0] = Math.min(this.vel[0], this.topSpeed);
				break;
			default:
				break;
		}
	}

	move() {
		//Restrict movement to window
		if (this.pos[0] < 0) {
			this.vel[0] = 0;
			this.pos[0] = 1;
		} else if (this.pos[0] > this.game.gameCanvas.width - this.width) {
			this.vel[0] = 0;
			this.pos[0] = this.game.gameCanvas.width - this.width - 1;
		}

		if (this.pos[1] < 0) {
			this.vel[1] = 0;
			this.pos[1] = 1;
		} else if (this.pos[1] > this.game.gameCanvas.height - this.height) {
			this.vel[1] = 0;
			this.pos[1] = this.game.gameCanvas.height - this.height - 1;
		}
		super.move();
	}
}

Player.PATH = './assets/images/sprites/ship.png';
Player.SPRITE_MAX_X = 2;
Player.SPRITE_MAX_Y = 7;
Player.SCALE = 2;
Player.SPRITE_WIDTH = 24;
Player.SPRITE_HEIGHT = 16;
Player.DIRECTION = 1;
Player.STARTING_VARS = {
	DECELERATION: 0.99,
	WEAPON_LOCKOUT: 300,
	BULLET_SCALE: 1,
	BULLET_SPEED: 4,
	TOP_SPEED: 6,
	BOOST_LEVEL: 1,
	POS: [10, 180],
	VEL: [0, 0]
};

module.exports = Player;


/***/ }),

/***/ "./lib/score.js":
/*!**********************!*\
  !*** ./lib/score.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./lib/ship.js":
/*!*********************!*\
  !*** ./lib/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");
const Bullet = __webpack_require__(/*! ./bullet */ "./lib/bullet.js");

class Ship extends MovingObject {
	constructor(options) {
		super(options);
	}

	fire() {
		const pos = this.pos.slice();
		pos[0] = this.direction > 0 ? pos[0] + this.width + 1 : pos[0] - Bullet.SPRITE_WIDTH * this.bulletScale - 1;
		pos[1] += (this.height - Bullet.SPRITE_HEIGHT * this.bulletScale) / 2;
		const vel = [Math.max(this.vel.slice()[0], 0) + this.direction * this.bulletSpeed, 0];
		const bullet = new Bullet({ pos, vel, game: this.game, scale: this.bulletScale, direction: this.direction });

		this.game.add(bullet);
	}
}

module.exports = Ship;


/***/ }),

/***/ "./lib/small_enemy.js":
/*!****************************!*\
  !*** ./lib/small_enemy.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EnemyShip = __webpack_require__(/*! ./enemy_ship */ "./lib/enemy_ship.js");

class SmallEnemy extends EnemyShip {
	constructor(options) {
		super({
			path: SmallEnemy.PATH,
			scale: SmallEnemy.SCALE,
			spriteWidth: SmallEnemy.SPRITE_WIDTH,
			spriteHeight: SmallEnemy.SPRITE_HEIGHT,
			spriteMaxX: SmallEnemy.SPRITE_MAX_X,
			spriteMaxY: SmallEnemy.SPRITE_MAX_Y,
			vel: SmallEnemy.STARTING_VARS.VEL,
			...options
		});
		this.topSpeed = SmallEnemy.STARTING_VARS.TOP_SPEED;
		this.fireRate = SmallEnemy.STARTING_VARS.FIRE_RATE;
		this.bulletScale = SmallEnemy.STARTING_VARS.BULLET_SCALE;
		this.bulletSpeed = SmallEnemy.STARTING_VARS.BULLET_SPEED;
		this.basePoints = SmallEnemy.STARTING_VARS.BASE_POINTS;
	}
}

SmallEnemy.PATH = './assets/images/sprites/enemy-small.png';
SmallEnemy.SPRITE_MAX_X = 1;
SmallEnemy.SPRITE_MAX_Y = 2;
SmallEnemy.SCALE = 2;
SmallEnemy.SPRITE_WIDTH = 16;
SmallEnemy.SPRITE_HEIGHT = 16;
SmallEnemy.WIDTH = SmallEnemy.SPRITE_WIDTH * SmallEnemy.SCALE;
SmallEnemy.HEIGHT = SmallEnemy.SPRITE_HEIGHT * SmallEnemy.SCALE;
SmallEnemy.STARTING_VARS = {
	TOP_SPEED: 6,
	VEL: [-1, 0],
	FIRE_RATE: 100,
	BULLET_SCALE: 1,
	BULLET_SPEED: 4,
	BASE_POINTS: 100
};

module.exports = SmallEnemy;


/***/ }),

/***/ "./lib/static_object.js":
/*!******************************!*\
  !*** ./lib/static_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

class StaticObject {
	constructor({ pos, path, scale = 1, spriteWidth, spriteHeight, game, spriteMaxX = 1, spriteMaxY = 1 }) {
		this.pos = pos;
		this.spriteWidth = spriteWidth;
		this.spriteHeight = spriteHeight;
		this.img = new Image();
		this.img.src = path;
		this.spriteIndex = { x: 0, y: 0, maxX: spriteMaxX, maxY: spriteMaxY };
		this.scale = scale;
		this.width = this.spriteWidth * this.scale;
		this.height = this.spriteHeight * this.scale;
		this.game = game;
		this.framesDrawn = 0;
	}

	draw(ctx) {
		if (this.img.naturalWidth > 0) {
			ctx.drawImage(
				this.img,
				0 + this.spriteIndex.x * this.spriteWidth,
				0 + this.spriteIndex.y * this.spriteHeight,
				this.spriteWidth,
				this.spriteHeight,
				this.pos[0],
				this.pos[1],
				this.width,
				this.height
			);

			if (this.framesDrawn % 10 === 0) {
				this.spriteIndex.x++;
				this.spriteIndex.x = this.spriteIndex.x % this.spriteIndex.maxX;
				this.spriteIndex.y++;
				this.spriteIndex.y = this.spriteIndex.y % this.spriteIndex.maxY;
			}

			this.framesDrawn++;
		}
	}

	xBounds() {
		return [this.pos[0], this.pos[0] + this.width];
	}

	yBounds() {
		return [this.pos[1], this.pos[1] + this.height];
	}

	isCollidedWith(otherObject) {
		return !(
			this.xBounds()[0] > otherObject.xBounds()[1] ||
			this.xBounds()[1] < otherObject.xBounds()[0] ||
			this.yBounds()[0] > otherObject.yBounds()[1] ||
			this.yBounds()[1] < otherObject.yBounds()[0]
		);
	}

	remove() {
		this.game.remove(this);
	}
}

module.exports = StaticObject;


/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
	throttle: (func, limit) => {
		let throttled;
		return (...args) => {
			if (!throttled) {
				func(...args);
				throttled = true;
				setTimeout(() => (throttled = false), limit);
			}
		};
	}
};

module.exports = Util;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map