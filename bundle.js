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
		super({ ...options, path: Bullet.PATH, width: Bullet.WIDTH, height: Bullet.HEIGHT });
	}
}

Bullet.PATH = './assets/images/sprites/bullet.png';
Bullet.HEIGHT = 8;
Bullet.WIDTH = 11;
Bullet.SCALE = 1;

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
	game.draw();
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
			width: EnemyShip.WIDTH,
			height: EnemyShip.HEIGHT,
			spriteMaxX: EnemyShip.SPRITE_MAX_X,
			spriteMaxY: EnemyShip.SPRITE_MAX_Y,
			// pos: EnemyShip.STARTING_VARS.POS,
			vel: EnemyShip.STARTING_VARS.VEL,
			deceleration: EnemyShip.STARTING_VARS.DECELERATION,
			...options
		});
		this.direction = -1;
		this.boostLevel = EnemyShip.STARTING_VARS.BOOST_LEVEL;
		this.topSpeed = EnemyShip.STARTING_VARS.TOP_SPEED;
		this.weaponLockout = EnemyShip.STARTING_VARS.WEAPON_LOCKOUT;
	}
}

EnemyShip.PATH = './assets/images/sprites/enemy-small.png';
EnemyShip.SPRITE_MAX_X = 1;
EnemyShip.SPRITE_MAX_Y = 2;
EnemyShip.SCALE = 2;
EnemyShip.WIDTH = 16;
EnemyShip.HEIGHT = 16;
EnemyShip.STARTING_VARS = {
	DECELERATION: 1,
	WEAPON_LOCKOUT: 300,
	TOP_SPEED: 6,
	BOOST_LEVEL: 1,
	// POS: [800, 180],
	VEL: [-1, 0]
};

module.exports = EnemyShip;


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

		this.generateBackground(backgroundCtx, midgroundCtx);
		this.player = new Player({ game: this });

		this.draw = this.draw.bind(this);
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

	draw() {
		requestAnimationFrame(this.draw);
		this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
		this.background.draw();
		this.midground.draw();
		this.player.draw(this.ctx);
		this.bullets.forEach(bullet => bullet.draw(this.ctx));
		this.enemies.forEach(enemy => enemy.draw(this.ctx));
		this.player.move();
		this.bullets.forEach(bullet => bullet.move());
		this.enemies.forEach(enemy => enemy.move());

		if (this.frameIndex % this.minSpawnRateFrames === 0 && Math.random() < this.spawnChance) {
			this.spawnEnemy();
			console.log(this.frameIndex);
			this.frameIndex = 1;
		}
		this.frameIndex++;
	}

	spawnEnemy() {
		const pos = [800, Math.floor(Math.random() * (this.gameCanvas.height - EnemyShip.HEIGHT * EnemyShip.SCALE + 1))];
		const enemy = new EnemyShip({ game: this, pos });
		this.add(enemy);
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

const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

class MovingObject {
	constructor({
		pos,
		vel,
		path,
		deceleration = 1,
		scale = 1,
		width,
		height,
		game,
		speedMultiplier = 1,
		spriteMaxX = 1,
		spriteMaxY = 1
	}) {
		this.deceleration = deceleration;
		this.pos = pos;
		this.vel = vel;
		this.width = width;
		this.height = height;
		this.speedMultiplier = speedMultiplier;
		this.img = new Image();
		this.img.src = path;
		this.spriteIndex = { x: 0, y: 0, maxX: spriteMaxX, maxY: spriteMaxY };
		this.scale = scale;
		this.game = game;
		this.xBounds = [this.pos[0], this.pos[0] + width * scale];
		this.yBounds = [this.pos[1], this.pos[1] + height * scale];
		this.cornerCoords = [
			this.pos,
			[this.xBounds[1], this.yBounds[0]],
			[this.xBounds[0], this.yBounds[1]],
			[this.xBounds[1], this.yBounds[1]]
		];
	}

	draw(ctx) {
		if (this.img.naturalWidth > 0) {
			ctx.drawImage(
				this.img,
				0 + this.spriteIndex.x * this.img.naturalWidth / this.spriteIndex.maxX,
				0 + this.spriteIndex.y * this.img.naturalHeight / this.spriteIndex.maxY,
				this.img.naturalWidth / this.spriteIndex.maxX,
				this.img.naturalHeight / this.spriteIndex.maxY,
				this.pos[0],
				this.pos[1],
				this.img.naturalWidth / this.spriteIndex.maxX * this.scale,
				this.img.naturalHeight / this.spriteIndex.maxY * this.scale
			);
		}
	}

	move() {
		this.pos[0] += this.vel[0] * this.speedMultiplier;
		this.pos[1] += this.vel[1] * this.speedMultiplier;

		this.vel[0] *= this.deceleration;
		this.vel[1] *= this.deceleration;

		if (this.game.frameIndex % 10 === 0) {
			this.spriteIndex.x++;
			this.spriteIndex.x = this.spriteIndex.x % this.spriteIndex.maxX;
			this.spriteIndex.y++;
			this.spriteIndex.y = this.spriteIndex.y % this.spriteIndex.maxY;
		}
	}

	isCollidedWith(otherObject) {
		return Util.between(this.cornerCoords, otherObject.xBounds, otherObject.yBounds);
	}

	collideWith(otherObject) {}

	remove() {
		this.game.remove(this);
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
			width: Player.WIDTH,
			height: Player.HEIGHT,
			spriteMaxX: Player.SPRITE_MAX_X,
			spriteMaxY: Player.SPRITE_MAX_Y,
			pos: Player.STARTING_VARS.POS,
			vel: Player.STARTING_VARS.VEL,
			deceleration: Player.STARTING_VARS.DECELERATION,
			...options
		});
		this.direction = 1;
		this.boostLevel = Player.STARTING_VARS.BOOST_LEVEL;
		this.topSpeed = Player.STARTING_VARS.TOP_SPEED;
		this.weaponLockout = Player.STARTING_VARS.WEAPON_LOCKOUT;
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
}

Player.PATH = './assets/images/sprites/ship.png';
Player.SPRITE_MAX_X = 2;
Player.SPRITE_MAX_Y = 7;
Player.SCALE = 2;
Player.WIDTH = 24;
Player.HEIGHT = 16;
Player.STARTING_VARS = {
	DECELERATION: 0.99,
	WEAPON_LOCKOUT: 300,
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
		pos[0] += this.width * this.scale + 5 * this.direction;
		pos[1] += (this.height * this.scale - Bullet.HEIGHT * Bullet.SCALE) / 2;
		const vel = [Math.max(this.vel.slice()[0], 0) + 4 * this.direction, 0];
		const bullet = new Bullet({ pos, vel, game: this.game });

		this.game.add(bullet);
	}
}

module.exports = Ship;


/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
	between: (cornerCoords, xBounds, yBounds) => {
		return (
			(cornerCoords[0][0] >= xBounds[0] &&
				cornerCoords[0][0] <= xBounds[1] &&
				cornerCoords[0][1] >= yBounds[0] &&
				cornerCoords[0][1] <= yBounds[1]) ||
			(cornerCoords[1][0] >= xBounds[0] &&
				cornerCoords[1][0] <= xBounds[1] &&
				cornerCoords[1][1] >= yBounds[0] &&
				cornerCoords[1][1] <= yBounds[1]) ||
			(cornerCoords[2][0] >= xBounds[0] &&
				cornerCoords[2][0] <= xBounds[1] &&
				cornerCoords[2][1] >= yBounds[0] &&
				cornerCoords[2][1] <= yBounds[1]) ||
			(cornerCoords[3][0] >= xBounds[0] &&
				cornerCoords[3][0] <= xBounds[1] &&
				cornerCoords[3][1] >= yBounds[0] &&
				cornerCoords[3][1] <= yBounds[1])
		);
	},

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