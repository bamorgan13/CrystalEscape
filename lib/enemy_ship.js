const Ship = require('./ship');

class EnemyShip extends Ship {
	constructor(options) {
		super({
			path: EnemyShip.PATH,
			scale: EnemyShip.SCALE,
			spriteWidth: EnemyShip.SPRITE_WIDTH,
			spriteHeight: EnemyShip.SPRITE_HEIGHT,
			spriteMaxX: EnemyShip.SPRITE_MAX_X,
			spriteMaxY: EnemyShip.SPRITE_MAX_Y,
			// pos: EnemyShip.STARTING_VARS.POS,
			vel: EnemyShip.STARTING_VARS.VEL,
			deceleration: EnemyShip.STARTING_VARS.DECELERATION,
			direction: EnemyShip.DIRECTION,
			...options
		});
		// this.boostLevel = EnemyShip.STARTING_VARS.BOOST_LEVEL;
		this.topSpeed = EnemyShip.STARTING_VARS.TOP_SPEED;
		this.weaponLockout = EnemyShip.STARTING_VARS.WEAPON_LOCKOUT;
		this.fireRate = EnemyShip.STARTING_VARS.FIRE_RATE;

		this.draw = this.draw.bind(this);
	}

	draw(ctx) {
		super.draw(ctx);
		if (this.game.frameIndex % this.fireRate === 0) this.fire();
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
	WEAPON_LOCKOUT: 300,
	TOP_SPEED: 6,
	// BOOST_LEVEL: 1,
	VEL: [-1, 0],
	FIRE_RATE: 100
};

module.exports = EnemyShip;
