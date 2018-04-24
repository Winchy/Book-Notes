function* makeGenerator() {
	console.log('start')
	yield 'Hello World';
	console.log('Re-entered');
	return 'end';
}

const gen = makeGenerator();
console.log(gen.next());
console.log(gen.next());

console.log('  ');

function* twoWayGenerator() {
	const what = yield null;
	yield null;
	console.log('Hello ' + what);
}

const twoWay = twoWayGenerator();
twoWay.next();
twoWay.next('hi');
twoWay.next({name: 'world'});


console.log('------------------------')

function asyncConcat(a, b, callback) {
	process.nextTick(() => {
		callback(null, a + ' ' + b, 'hoho');
	});
}

function asyncFlow(generatorFunction) {
	function callback(err) {
		if (err) {
			return generator.throw(err);
		}
		const results = [].slice.call(arguments, 1);
		generator.next(results.length > 1 ? results : results[0]);
	}
	const generator = generatorFunction(callback);
	generator.next();
}

asyncFlow(function* (callback) {
	const myself = yield asyncConcat('hello', 'world', callback);
	console.log(myself);
});

// console.log('----------------------')

function asyncConcatPromise(a, b) {
	return new Promise((resolve, reject) => {
		process.nextTick(() => {
			resolve(a + ' ' + b);
		})
	});
}

// asyncConcatPromise('hello', 'world')
// 	.then(result => console.log(result));

function asyncPromiseFlow(generatorFunc) {
	function callback(result) {
		const p = generator.next(result).value;
		p && p.then(callback)
	}
	const generator = generatorFunc();
	const p = generator.next().value;
	p && p.then(callback)
}

asyncPromiseFlow(function* () {
	const myself = yield asyncConcatPromise('hello', 'world');
	console.log(myself);
	const nextOne = yield asyncConcatPromise(myself, '!!!');
	console.log(nextOne);
});