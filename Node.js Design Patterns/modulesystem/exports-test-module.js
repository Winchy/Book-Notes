// exports.hello = () => {
// 	console.log('hello');
// };

////////////////////////////////

// module.exports = {
// 	name: 'hello exports',
// 	hello: () => {
// 		console.log(this.name);
// 	}
// }

////////////////////////////////////////

// module.exports = () => {
// 	this.name = 'hello exports';
// 	this.hello = () => {
// 		console.log(this.name);
// 	};
// }

///////////////////////////////////////

// var ET = function() {
// 	this.name = 'hello et';
// 	this.hello = () => {
// 		console.log(this.name);
// 	};
// };

// module.exports = ET;

//////////////////////////////////////

exports.name = 'et';
module.exports = {
	// name: 'et1',
	hello: () => {
		console.log('hello et')
	}
}