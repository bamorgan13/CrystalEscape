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
			this.path = `./assets/images/backgrounds/level_${level}/background.png`;
			this.scrollSpeed = 1 + level * 0.1;
		} else {
			this.path = `./assets/images/backgrounds/level_${level}/midground.png`;
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
			path: EnemyShip.PATH,
			scale: EnemyShip.SCALE,
			spriteWidth: EnemyShip.SPRITE_WIDTH,
			spriteHeight: EnemyShip.SPRITE_HEIGHT,
			spriteMaxX: EnemyShip.SPRITE_MAX_X,
			spriteMaxY: EnemyShip.SPRITE_MAX_Y,
			vel: EnemyShip.STARTING_VARS.VEL,
			deceleration: EnemyShip.STARTING_VARS.DECELERATION,
			direction: EnemyShip.DIRECTION,
			...options
		});
		this.topSpeed = EnemyShip.STARTING_VARS.TOP_SPEED;
		this.fireRate = EnemyShip.STARTING_VARS.FIRE_RATE;
		this.bulletScale = EnemyShip.STARTING_VARS.BULLET_SCALE;

		this.draw = this.draw.bind(this);
	}

	draw(ctx) {
		super.draw(ctx);
		if (this.framesDrawn % this.fireRate === 0) this.fire();
	}
}

EnemyShip.PATH = './assets/images/sprites/enemy-small.png';
EnemyShip.SPRITE_MAX_X = 1;
EnemyShip.SPRITE_MAX_Y = 2;
EnemyShip.SCALE = 2;
EnemyShip.SPRITE_WIDTH = 16;
EnemyShip.SPRITE_HEIGHT = 16;
EnemyShip.WIDTH = EnemyShip.SPRITE_WIDTH * EnemyShip.SCALE;
EnemyShip.HEIGHT = EnemyShip.SPRITE_HEIGHT * EnemyShip.SCALE;
EnemyShip.DIRECTION = -1;
EnemyShip.STARTING_VARS = {
	DECELERATION: 1,
	TOP_SPEED: 6,
	VEL: [-1, 0],
	FIRE_RATE: 100,
	BULLET_SCALE: 1
};

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
const Explosion = __webpack_require__(/*! ./explosion */ "./lib/explosion.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

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
	TOP_SPEED: 6,
	BOOST_LEVEL: 1,
	POS: [10, 180],
	VEL: [0, 0]
};

module.exports = Player;


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
		const vel = [Math.max(this.vel.slice()[0], 0) + 4 * this.direction, 0];
		const bullet = new Bullet({ pos, vel, game: this.game, scale: this.bulletScale, direction: this.direction });

		this.game.add(bullet);
	}
}

module.exports = Ship;


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