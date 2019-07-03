const Ship = require('./ship');

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
