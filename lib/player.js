const Ship = require('./ship');

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