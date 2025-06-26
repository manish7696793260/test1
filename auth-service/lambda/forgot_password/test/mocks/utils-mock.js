const TEST_CONSTANTS = require('../TEST_CONSTANTS');
const secretFunction = async () => {
	return TEST_CONSTANTS.SECRET_MANAGER_VALUES;
};
const cognitoForgotPassword = async (params) => {
	if (params.Username === 'cognitoerror@user.com') {
		throw new Error('Cognito Error');
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
	cognitoForgotPassword
};
