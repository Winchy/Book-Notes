const x = 22;
const y = 17;

const obj = {x, y}

module.exports = {
	obj,
	square (s) {
		return s * s;
	},
	cube (c) {
		return c * c * c;
	}
}