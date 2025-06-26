const CONSTANTS = require('./CONSTANTS');

const checkPermission = (permission) => {
	return CONSTANTS.LOG_LEVELS.includes(permission);
};

exports.info = (message) => {
	if (checkPermission('info')) {
		console.info(message);
	}
};

exports.log = (message) => {
	if (checkPermission('log')) {
		console.log(message);
	}
};

exports.warn = (message) => {
	if (checkPermission('warn')) {
		console.warn(message);
	}
};

exports.error = (message) => {
	if (checkPermission('error')) {
		console.error(message);
	}
};
