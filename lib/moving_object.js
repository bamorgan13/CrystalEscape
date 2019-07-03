const Util = require('./util');

class MovingObject {
	constructor({
		pos,
		vel,
		path,
		deceleration = 1,
		scale = 1,
		spriteWidth,
		spriteHeight,
		game,
		speedMultiplier = 1,
		spriteMaxX = 1,
		spriteMaxY = 1
	}) {
		this.deceleration = deceleration;
		this.pos = pos;
		this.vel = vel;
		this.spriteWidth = spriteWidth;
		this.spriteHeight = spriteHeight;
		this.speedMultiplier = speedMultiplier;
		this.img = new Image();
		this.img.src = path;
		this.spriteIndex = { x: 0, y: 0, maxX: spriteMaxX, maxY: spriteMaxY };
		this.scale = scale;
		this.width = this.spriteWidth * this.scale;
		this.height = this.spriteHeight * this.scale;
		this.game = game;
		this.xBounds = [this.pos[0], this.pos[0] + this.width];
		this.yBounds = [this.pos[1], this.pos[1] + this.height];
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
				0 + this.spriteIndex.x * this.spriteWidth,
				0 + this.spriteIndex.y * this.spriteHeight,
				this.spriteWidth,
				this.spriteHeight,
				this.pos[0],
				this.pos[1],
				this.width,
				this.height
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
