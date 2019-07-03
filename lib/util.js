const Util = {
	between: (cornerCoords, xBounds, yBounds) => {
		return (
			(cornerCoords[0][0] >= xBounds[0] &&
				cornerCoords[0][0] <= xBounds[1] &&
				cornerCoords[0][1] >= yBounds[0] &&
				cornerCoords[0][1] <= yBounds[1]) ||
			(cornerCoords[1][0] >= xBounds[0] &&
				cornerCoords[1][0] <= xBounds[1] &&
				cornerCoords[1][1] >= yBounds[0] &&
				cornerCoords[1][1] <= yBounds[1]) ||
			(cornerCoords[2][0] >= xBounds[0] &&
				cornerCoords[2][0] <= xBounds[1] &&
				cornerCoords[2][1] >= yBounds[0] &&
				cornerCoords[2][1] <= yBounds[1]) ||
			(cornerCoords[3][0] >= xBounds[0] &&
				cornerCoords[3][0] <= xBounds[1] &&
				cornerCoords[3][1] >= yBounds[0] &&
				cornerCoords[3][1] <= yBounds[1])
		);
	},

	throttle: (func, limit) => {
		let throttled;
		return (...args) => {
			if (!throttled) {
				func(...args);
				throttled = true;
				setTimeout(() => (throttled = false), limit);
			}
		};
	}
};

module.exports = Util;
