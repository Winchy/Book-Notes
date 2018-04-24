const co = require('co');

class TaskQueue {
	constructor(concurrency) {
		this.concurrency = concurrency;
		this.running = 0;
		this.taskQueue = [];				//没有认领的任务进入队列
		this.consumerQueue = [];			//空闲的消费者进入队列
		this.spawnWorkers(concurrency);	
	}
	pushTask(task) {
		//如果有空闲的消费者，第一个出列认领任务，否则任务进入任务队列
		if (this.consumerQueue.length != 0) {
			let consumer = this.consumerQueue.shift();
			consumer('null', task);
		} else {
			this.taskQueue.push(task);
		}
	}
	spawnWorkers(concurrency) {
		const self = this;
		for (let i = 0; i < concurrency; ++i) {
			co(function* () {
				while (true) {
					//由于self.nextTask()返回的是一个function，所以该function会由co.thunkToPromise封装为一个Promise对象
					//该Promise会立刻执行self.nextTask()返回的function，且传入的callback中包含(err, res)两个参数
					//co会在该Promise.then回调中调用generator.next(res)或generator.throw(err)
					//因为nextTask()返回的function中将callback加入comsumerQueue，所以调用可以将callback从consumerQueu中取出并传入需要执行的任务
					const task = yield self.nextTask();

					//此时task是一个generator，co会再次进行进行封装，及调用co(task)，实现递归
					yield task;
				}
			});
		}
	}
	nextTask() {
		return callback => {
			//如果任务队列有任务没有认领，立即认领执行
			if (this.taskQueue.length != 0) {
				return callback(null, this.taskQueue.shift());
			}
			//否则进入空闲消费者队列
			this.consumerQueue.push(callback);
		}
	}

/************************************
以上nextTask中callback的定义：

function (err, res) {
  if (err) return reject(err);
  if (arguments.length > 2) res = slice.call(arguments, 1);
  resolve(res);
}

************************************/
}

function asyncConcatPromise(a, b) {
	return new Promise((resolve, reject) => {
		process.nextTick(() => {
			resolve(a + ' ' + b);
		})
	});
}


tq = new TaskQueue(2);
for (let i = 0; i < 4; ++i) {
	tq.pushTask(function* () {
		const ret = yield asyncConcatPromise(i, i + 1);
		console.log(ret);

		const res = yield asyncConcatPromise('hi', 'ad');
		console.log(res);
	});
}