const fs = require('fs');
const cache = {};

function consistentReadAsync(filename, callback) {
	if (cache[filename]) {
		//invoked synchronously
		process.nextTick(() => callback(cache[filename]));
	} else {
		//asynchronous function
		fs.readFile(filename, 'utf8', (err, data) => {
			cache[filename] = data;
			callback(data);
		});
	}
}

function createFileReader(filename) {
	const listeners = [];
	consistentReadAsync
(filename, value => {
		listeners.forEach(listener => listener(value))
	});
	return {
		onReady: listener => listeners.push(listener)
	};
}

const reader1 = createFileReader('data.txt');
reader1.onReady(data => {
	console.log('first call data: ' + data);

	const reader2 = createFileReader('data.txt');
	reader2.onReady(data => console.log('second call data: ' + data));
});