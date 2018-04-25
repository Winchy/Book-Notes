const stream = require('stream')

class ReplaceStream extends stream.Transform {
	constructor(searchString, replaceString) {
		super();
		this.searchString = searchString;
		this.replaceString = replaceString;
		this.tailPiece = '';
	}
	_transform(chunk, encoding, callback) {
		// console.log(`_transform: ${chunk}, ${encoding}, ${callback}`);
		const pieces = (this.tailPiece + chunk).split(this.searchString);
		const lastPiece = pieces[pieces.length - 1];
		const tailPieceLen = this.searchString.length - 1;
		this.tailPiece = lastPiece.slice(-tailPieceLen);
		pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen);
		this.push(pieces.join(this.replaceString));
		callback(); //must be called in order to terminate this phase
	}
	_flush(callback) { //call when write finished
		// console.log(`\n_flush ${callback} ${this.tailPiece}`);
		this.push(this.tailPiece);
		callback(); //must be called in order to terminate this phase
	}
 }

 module.exports = ReplaceStream;