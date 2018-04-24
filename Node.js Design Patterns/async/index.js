const pro = require('./promise-test');
const fs = require('fs');

// const readFile = pro.promisify(fs.readFile);

// readFile('data.txt', 'utf8')
// 	.then(data => {
// 		console.log(data);
// 		return 'ha';
// 	}, error => {
// 		console.log("read error: " + error);
// 		return 'oh no!';
// 	}).then(arg => console.log(arg));

const asyncDivision = require('./async-division');

asyncDivision(1, 0, (error, result) => {
	if (error) { return console.log(error); }
	console.log('direct callback: ' + result);
}).then ( result => console.log('then: ' + result))
  .catch( error => console.log(error));