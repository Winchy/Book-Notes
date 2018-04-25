//const ReplaceStream = require('./replacestream');

/*******
const rs = new ReplaceStream('World', 'Node.js');
rs.on('data', chunk => console.log(chunk.toString())); //可读流监听data
rs.write('AWorldA Hello W');
rs.write('orld!');
rs.end();//接入交流结束
*****/

/*****
process.stdin
	.pipe(new ReplaceStream(process.argv[2], process.argv[3]))
	.pipe(process.stdout);
	***/

/***
const concatFiles = require('./concatFile')
concatFiles(process.argv[2], process.argv.slice(3), () => console.log('Files concatenated successfully!'));
***/
