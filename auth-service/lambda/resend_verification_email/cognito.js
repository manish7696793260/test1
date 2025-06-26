const CONSTANTS = require('./CONSTANTS');
const LAYER = require('utils');

/**
 * @name resendVerificationEmail
 * @description Resends verification email to the user using AWS Cognito.
 * @param {String} emailAddress - The user's email address.
 * @param {Object} appConfig - The application configuration containing poolId and clientId.
 * @returns {Promise<Object>} - The result of the resend verification email action.
 */
const resendVerificationEmail = async (emailAddress, appConfig) => {
	const params = {
		ClientId: appConfig.clientId,
		Username: emailAddress
	};
	try {
		await LAYER.cognitoSendConfirmationCode(params);
		return true;
	} catch (error) {
		LAYER.logger.error(error);
		const response = {
			success: false,
			errorCode: '',
			message: ''
		};

		switch (error.name) {
		case CONSTANTS.COGNITO_ERROR.TOO_MANY_REQUESTS:
			response.errorCode = CONSTANTS.ERRORS.TOO_MANY_REQUESTS.CODE;
			response.message = CONSTANTS.ERRORS.TOO_MANY_REQUESTS.MESSAGE;
			break;
		case CONSTANTS.COGNITO_ERROR.INVALID_PARAMETER_EXCEPTION:
			response.errorCode = CONSTANTS.ERRORS.VERIFICATION_MAIL_FAILED.CODE;
			response.message = CONSTANTS.ERRORS.VERIFICATION_MAIL_FAILED.MESSAGE;
			break;
		case CONSTANTS.COGNITO_ERROR.USER_NOT_FOUND:
			response.errorCode = CONSTANTS.ERRORS.VERIFICATION_MAIL_FAILED.CODE;
			response.message = CONSTANTS.ERRORS.VERIFICATION_MAIL_FAILED.MESSAGE;
			break;
		default:
			response.errorCode = CONSTANTS.ERRORS.VERIFICATION_MAIL_FAILED.CODE;
			response.message = CONSTANTS.ERRORS.VERIFICATION_MAIL_FAILED.MESSAGE;
			break;
		}
		return response;
	}
};

module.exports = {
	resendVerificationEmail
};
