const CONSTANTS = require('./CONSTANTS');
const LAYER = require('utils');
const DB = require('./db.js');

/**
 * @name authenticateUser
 * @description Authenticates a user with AWS Cognito.
 * @param {String} emailAddress - The user's email address.
 * @param {String} password - The user's password.
 * @param {Object} appConfig - The application configuration containing poolId and clientId.
 * @returns {Promise<Object>} - The authentication result containing tokens.
 */
const authenticateUser = async (emailAddress, password, appConfig, userData) => {
	const params = {
		AuthFlow: 'USER_PASSWORD_AUTH',
		ClientId: appConfig.clientId,
		AuthParameters: {
			USERNAME: emailAddress,
			PASSWORD: password
		}
	};

	try {
		const authResult = await LAYER.cognitoLogin(params);
		return authResult.AuthenticationResult;
	} catch (error) {
		LAYER.logger.error(error);
		const response = {
			success: false,
			errorCode: '',
			message: ''
		};

		// Handle specific Cognito errors
		switch (error.name) {
		case CONSTANTS.COGNITO_ERROR.USER_NOT_FOUND:
			response.errorCode = CONSTANTS.ERRORS.INVALID_GRANT.CODE;
			response.message = CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE;
			break;
		case CONSTANTS.COGNITO_ERROR.NOT_AUTHORIZED_EXCEPTION:
			response.errorCode = CONSTANTS.ERRORS.INVALID_GRANT.CODE;
			response.message = CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE;
			const accLockout = await DB.lockoutUser(userData, true, appConfig.table);
			if (accLockout.success === false && accLockout.lockoutFlag) {
				response.errorCode = CONSTANTS.ERRORS.ACCOUNT_LOCKOUT.CODE;
				response.message = CONSTANTS.ERRORS.ACCOUNT_LOCKOUT.MESSAGE;
			}
			break;
		case CONSTANTS.COGNITO_ERROR.PASSWORD_CONSTRAINT:
			response.errorCode = CONSTANTS.ERRORS.INVALID_GRANT.CODE;
			response.message = CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE;
			break;
		case CONSTANTS.COGNITO_ERROR.TOO_MANY_REQUESTS:
			response.errorCode = CONSTANTS.ERRORS.INVALID_GRANT.CODE;
			response.message = CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE;
			break;
		case CONSTANTS.COGNITO_ERROR.RESET_PASSWORD_EXCEPTION:
			response.errorCode = CONSTANTS.ERRORS.RESET_PASSWORD_EXCEPTION.CODE;
			response.message = CONSTANTS.ERRORS.RESET_PASSWORD_EXCEPTION.MESSAGE;
			break;
		case CONSTANTS.COGNITO_ERROR.LIMIT_EXCEEDED:
			response.errorCode = CONSTANTS.ERRORS.LIMIT_EXCEEDED.CODE;
			response.message = CONSTANTS.ERRORS.LIMIT_EXCEEDED.MESSAGE;
			break;
		case CONSTANTS.COGNITO_ERROR.USER_NOT_CONFIRMED:
			response.errorCode = CONSTANTS.ERRORS.PROCESSING_ERROR.CODE;
			response.message = CONSTANTS.ERRORS.PROCESSING_ERROR.MESSAGE;
			await DB.lockoutUser(userData, true, appConfig.table);
			break;
		default:
			response.errorCode = CONSTANTS.ERRORS.INVALID_GRANT.CODE;
			response.message = CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE;
			break;
		}
		return response;
	}
};

/**
 * @name refreshToken
 * @description Refreshes a user's tokens with AWS Cognito.
 * @param {String} refreshToken - The refresh token.
 * @param {Object} appConfig - The application configuration containing poolId and clientId.
 * @returns {Promise<Object>} - The authentication result containing new tokens.
 */
const refreshToken = async (refreshToken, appConfig) => {
	const params = {
		AuthFlow: 'REFRESH_TOKEN_AUTH',
		ClientId: appConfig.clientId,
		AuthParameters: {
			REFRESH_TOKEN: refreshToken
		}
	};

	try {
		const authResult = await LAYER.cognitoLogin(params);
		return authResult.AuthenticationResult;
	} catch (error) {
		LAYER.logger.error(error);
		const response = {
			success: false,
			errorCode: '',
			message: ''
		};

		// Handle specific Cognito errors
		switch (error.name) {
		case CONSTANTS.COGNITO_ERROR.NOT_AUTHORIZED_EXCEPTION:
			response.errorCode = CONSTANTS.ERRORS.INVALID_REFRESH_TOKEN.CODE;
			response.message = CONSTANTS.ERRORS.INVALID_REFRESH_TOKEN.MESSAGE;
			break;
		default:
			response.errorCode = CONSTANTS.ERRORS.INVALID_GRANT.CODE;
			response.message = CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE;
			break;
		}
		return response;
	}
};

module.exports = {
	authenticateUser,
	refreshToken
};
