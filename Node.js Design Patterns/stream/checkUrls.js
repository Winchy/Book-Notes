const fs = require('fs')
const split = require('split');
const request = require('request');
const ParallelStream = require('./parallelstream');
const through = require('through2');

//this is parallel
/*
fs.createReadStream(process.argv[2])
	.pipe(split())
	.pipe(new ParallelStream((url, enc, push, done) => {
		if (!url) return done();
		request.head(url.toString('utf8'), (err, response) => {
			push(url + ' is ' + (err? 'down' : 'up') + '\n');
			done();
		});
	}))
	.pipe(process.stdout)
	// .pipe(fs.createWriteStream('./stream/urlstatus.txt'))
	.on('finish', () => console.log('All urls were checked'));
*/

// this is ordered

fs.createReadStream(process.argv[2])
	.pipe(split())
	.pipe(through.obj((url, enc, done) => {
		// console.log(url);
		// console.log(done);
		if (!url) return done();
		request.head(url, (err, response) => {
			// console.log(url + ' is ' + (err? 'down' : 'up') + '\n');
			done(null, url + ' is ' + (err? 'down' : 'up') + '\n');
		});
	}))
	.pipe(process.stdout)
	.on('finish', () => console.log('All urls were checked'));
	