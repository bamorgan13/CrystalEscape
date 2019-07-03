const MovingObject = require('./moving_object');
const Bullet = require('./bullet');

class Ship extends MovingObject {
	constructor(options) {
		super(options);
	}

	fire() {
		const pos = this.pos.slice();
		pos[0] += this.width + 20 * this.direction + Math.min(0, this.direction * Bullet.WIDTH);
		pos[1] += (this.height - Bullet.HEIGHT) / 2;
		const vel = [Math.max(this.vel.slice()[0], 0) + 4 * this.direction, 0];
		const bullet = new Bullet({ pos, vel, game: this.game });

		this.game.add(bullet);
	}
}

module.exports = Ship;
