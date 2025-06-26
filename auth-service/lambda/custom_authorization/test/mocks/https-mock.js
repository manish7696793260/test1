
const EventEmitter = require('events');

const get = (url, callback) => {
	const response = new EventEmitter();

	process.nextTick(() => {
	  callback(response);
	  response.emit('data', JSON.stringify({
			keys: [
		  {
					kid: 'kid',
					n: 'someModulus',
					e: 'someExponent',
					kty: 'RSA'
		  }
			]
	  }));
	  response.emit('end');
	});

	return new EventEmitter();
};

module.exports = {
	get
};
