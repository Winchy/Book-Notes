const stream = require('stream')

class ParallelStream extends stream.Transform {
	constructor(userTransform) {
		super({objectNode: true});
		this.userTransform = userTransform;
		this.running = 0;
		this.terminateCall = null;
	}
	_transform(chunk, enc, done) {
		this.running ++;
		this.userTransform(chunk, enc, this.push.bind(this), this._OnComplete.bind(this));
		done();
	}
	_flush(done) {
		if (this.running > 0) {
			this.terminateCall = done;
		} else {
			done();
		}
	}
	_OnComplete(err) {
		this.running--;
		if (err) {
			return this.emit('error', err);
		}
		if (this.running == 0) {
			this.terminateCall && this.terminateCall();
		}
	}
}

module.exports = ParallelStream