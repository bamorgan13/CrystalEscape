const Ship = require('./ship');

class EnemyShip extends Ship {
	constructor(options) {
		super(options);
		this.direction = -1;
	}
}

module.exports = EnemyShip;
