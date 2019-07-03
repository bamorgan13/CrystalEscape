const MovingObject = require('./moving_object');
const Bullet = require('./bullet');

class Ship extends MovingObject {
	constructor(options) {
		super({ ...options, spriteMaxX: 2, spriteMaxY: 7, deceleration: 0.95 });
	}

	fire() {
		const pos = this.pos.slice();
		pos[0] += this.width * this.scale + 5;
		pos[1] += (this.height * this.scale - Bullet.HEIGHT - Bullet.SCALE) / 2;
		const vel = [Math.max(this.vel.slice()[0], 0) + 4, 0];
		const bullet = new Bullet({ pos, vel, game: this.game });
		console.log('ShipPos', this.pos);
		console.log('ShipYBounds', this.yBounds);

		console.log('BulletPos', bullet.pos);
		console.log('BulletYBounds', bullet.yBounds);
		this.game.add(bullet);
	}
}

module.exports = Ship;
