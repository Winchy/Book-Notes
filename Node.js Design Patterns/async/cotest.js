const co = require('co');

function* asyncConcat(a, b) {
	const ret = yield () => {return a + ' ' + b;};
	console.log(ret);
	return ret;
}

function asyncConcatPromise(a, b) {
	return new Promise((resolve, reject) => {
		process.nextTick(() => {
			resolve(a + ' ' + b);
		})
	});
}

co(function* () {
	// const s = yield asyncConcat('start', 'running');
	// console.log(s);
	const r = yield asyncConcatPromise('hello', 'world');
	console.log(r);
	const res = yield asyncConcatPromise('good', 'morning');
	console.log(res);
});

