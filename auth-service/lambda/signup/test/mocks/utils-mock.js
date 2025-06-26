const TEST_CONSTANTS = require('../TEST_CONSTANTS');
const CONSTANTS = require('../../CONSTANTS');
const secretFunction = async () => {
	return TEST_CONSTANTS.SECRET_MANAGER_VALUES;
};
const cognitoSignup = async (params) => {
	if (params.Username === 'existinguser@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.USER_ALREADY_EXISTS;
		throw error;
	}
	if (params.Username === 'invalidparameter@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.PASSWORD_CONSTRAINT;
		throw error;
	}
	if (params.Username === 'toomanyrequests@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.TOO_MANY_REQUESTS;
		throw error;
	}
	if (params.Username === 'internalserver@user.com') {
		const error = new Error();
		error.name = CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR;
		throw error;
	}
	return {
		success: true
	};
};

const saveItem = async (params) => {
	if (params.Item.name === 'uncaughtError') {
		throw new Error();
	} else { return true; };
};

const verifyPassword = async (value) => {
	if (value === 'password1234') return false;
	return {
		success: true
	};
};

const logger = {
	error: (message) => {
		return;
	}
};

module.exports = {
	secretFunction,
	cognitoSignup,
	saveItem,
	logger,
	verifyPassword
};
