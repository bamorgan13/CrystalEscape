export default class Background {
	constructor(ctx, type, level = 1) {
		this.ctx = ctx;
		if (type === 'background') {
			this.path = `./assets/images/backgrounds/level_${level}/background.png`;
			this.options = BACKGROUND_OPTIONS;
			this.scrollSpeed = level * 30;
		} else {
			this.path = `./assets/images/backgrounds/level_${level}/midground.png`;
			this.options = MIDGROUND_OPTIONS;
			this.scrollSpeed = level * 60;
		}
		this.x = 0;
		this.y = 0;
		this.scrollSpeed = scrollSpeed;
		this.img = new Image();
		this.img.src = this.path;

		this.draw = this.draw.bind(this);
	}

	draw() {
		this.ctx.clearRect(0, 0, 600, 352);
		this.ctx.drawImage(this.img, this.x, this.y);
		this.ctx.drawImage(this.img, this.x + this.img.width, this.y);
		if (this.img.width < 600) {
			this.ctx.drawImage(this.img, this.x + this.img.width * 2, this.y);
		}
		if (this.x <= -this.img.width) {
			this.x = 0;
		}
		this.x -= this.scrollSpeed;
	}
}
