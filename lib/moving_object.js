const Util = require('./util');

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
		this.frameCount = 0;
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

		this.frameCount++;
		if (this.frameCount % 10 === 0) {
			this.spriteIndex.x++;
			this.spriteIndex.x = this.spriteIndex.x % this.spriteIndex.maxX;
			this.spriteIndex.y++;
			this.spriteIndex.y = this.spriteIndex.y % this.spriteIndex.maxY;
			this.frameCount = 0;
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
