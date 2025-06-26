const TEST_CONSTANTS = require('../TEST_CONSTANTS');
const CONSTANTS = require('../../CONSTANTS');

const secretFunction = async () => {
	return TEST_CONSTANTS.SECRET_MANAGER_VALUES;
};

const cognitoLogin = async (params) => {
	if (params.AuthParameters.USERNAME === 'usernotfound@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.USER_NOT_FOUND;
		throw error;
	}
	if (params.AuthParameters.USERNAME === 'usernotfound1@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.USER_NOT_FOUND;
		throw error;
	}
	if (params.AuthParameters.USERNAME === 'invalidparameter@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.PASSWORD_CONSTRAINT;
		throw error;
	}
	if (params.AuthParameters.USERNAME === 'toomanyrequests@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.TOO_MANY_REQUESTS;
		throw error;
	}
	if (params.AuthParameters.USERNAME === 'notauthorized@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.NOT_AUTHORIZED_EXCEPTION;
		throw error;
	}
	if (params.AuthParameters.USERNAME === 'userexceedattempts@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.NOT_AUTHORIZED_EXCEPTION;
		throw error;
	}
	if (params.AuthParameters.USERNAME === 'maxinvalidattempts@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.NOT_AUTHORIZED_EXCEPTION;
		throw error;
	}
	if (params.AuthParameters.USERNAME === 'passwordreset@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.RESET_PASSWORD_EXCEPTION;
		throw error;
	}
	if (params.AuthParameters.USERNAME === 'limitexceeded@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.LIMIT_EXCEEDED;
		throw error;
	}
	if (params.AuthParameters.USERNAME === 'invalidgrant@user.com') {
		const error = new Error();
		error.name = CONSTANTS.ERRORS.INVALID_GRANT;
		throw error;
	}
	if (params.AuthParameters.USERNAME === 'usernotconfirmed@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.USER_NOT_CONFIRMED;
		throw error;
	}
	if (params.AuthParameters.REFRESH_TOKEN === 'tokenNotAuthorized@user.com') {
		const error = new Error();
		error.name = CONSTANTS.COGNITO_ERROR.NOT_AUTHORIZED_EXCEPTION;
		throw error;
	}
	if (params.AuthParameters.REFRESH_TOKEN === 'invalidGrant@user.com') {
		const error = new Error();
		error.name = CONSTANTS.ERRORS.INVALID_GRANT;
		throw error;
	}
	return {AuthenticationResult: {
		RefreshToken: 'RefreshToken'
	}};
};

const logger = {
	error: (message) => {
		return;
	}
};

const getItem = async (user) => {
	if (user.ExpressionAttributeValues[':id'] === 'USER#userNotFound@user.com') {
		throw new Error('user not found');
	}
	if (user.ExpressionAttributeValues[':id'] === 'USER#noAttemptKey@user.com') {
		return {
			Count: 1,
			Items: [
				{
					lockoutAttributes: {
						lockoutTime: 8822346639142
					}
				}
			]
		};
	}
	if (user.ExpressionAttributeValues[':id'] === 'USER#userExceedAttempts@user.com') {
		return {
			Count: 1,
			Items: [
				{
					lockoutAttributes: {
						invalidLoginAttempts: '6',
						lockoutTime: 0
					}
				}
			]
		};
	}
	if (user.ExpressionAttributeValues[':id'] === 'USER#maxInvalidAttempts@user.com') {
		return {
			Count: 1,
			Items: [
				{
					lockoutAttributes: {
						invalidLoginAttempts: '4',
						lockoutTime: 0
					}
				}
			]
		};
	}
	if (user.ExpressionAttributeValues[':id'] === 'USER#userExceedAttemptsNLockoutLeft@user.com') {
		return {
			Count: 1,
			Items: [
				{
					lockoutAttributes: {
						invalidLoginAttempts: '6',
						lockoutTime: 8822346639142
					}
				}
			]
		};
	}
	return {
		Count: 1,
		Items: [
			{
				lockoutAttributes: {
					invalidLoginAttempts: '0',
					lockoutTime: 0
				}
			}
		]
	};
};

const updateItem = async () => {
	return;
};

const generateUserId = (email) => {
	if (email === 'userExceedAttempts@user.com') {
		return 'userExceedAttempts@user.com';
	}
	if (email === 'userExceedAttemptsNLockoutLeft@user.com') {
		return 'userExceedAttemptsNLockoutLeft@user.com';
	}
	if (email === 'maxInvalidAttempts@user.com') {
		return 'maxInvalidAttempts@user.com';
	}
	if (email === 'noAttemptKey@user.com') {
		return 'noAttemptKey@user.com';
	}
	if (email === 'userNotFound@user.com') {
		return 'userNotFound@user.com';
	}
	if (email === 'invalidParameter@user.com') {
		return 'invalidParameter@user.com';
	}
	return 'userID';
};

module.exports = {
	secretFunction,
	cognitoLogin,
	logger,
	getItem,
	updateItem,
	generateUserId
};
