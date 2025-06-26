const TEST_CONSTANTS = require('../TEST_CONSTANTS');
const CONSTANTS = require('../../CONSTANTS');

const secretFunction = async () => {
	return TEST_CONSTANTS.SECRET_MANAGER_VALUES;
};
const cognitoSendConfirmationCode = async (params) => {
	if (params.Username === 'cognitoerror@user.com') {
		throw new Error('Cognito Error');
	}
	if (params.Username === 'usernotfound@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.USER_NOT_FOUND;
		throw error;
	}
	if (params.Username === 'toomanyrequests@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.TOO_MANY_REQUESTS;
		throw error;
	}
	if (params.Username === 'invalidprameter@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.INVALID_PARAMETER_EXCEPTION;
		throw error;
	}
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
	logger,
	cognitoSendConfirmationCode
};
