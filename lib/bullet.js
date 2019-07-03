const MovingObject = require('./moving_object');

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
