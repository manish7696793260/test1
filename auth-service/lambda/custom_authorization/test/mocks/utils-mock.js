const TEST_CONSTANTS = require('../TEST_CONSTANTS');

const secretFunction = async () => {
	return TEST_CONSTANTS.SECRET_MANAGER_VALUES;
};

const logger = {
	log: (messge) => {
		return;
	}
};

const checkIfTokenUpdated = async () => {
	let passwordUpdated = false;
	return passwordUpdated;
};

module.exports = {
	secretFunction,
	logger,
	checkIfTokenUpdated
};
