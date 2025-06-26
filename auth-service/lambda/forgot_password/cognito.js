const LAYER = require('utils');

/**
 * @name forgotPassword
 * @description Initiates a forgot password request with AWS Cognito.
 * @param {String} emailAddress - The user's email address.
 * @param {Object} appConfig - The application configuration containing poolId and clientId.
 * @returns {Promise<Object>} - The result of the forgot password request.
 */
const forgotPassword = async (emailAddress, appConfig) => {
	const params = {
		ClientId: appConfig.clientId,
		Username: emailAddress
	};
	try {
		await LAYER.cognitoForgotPassword(params);
		return true;
	} catch (error) {
		LAYER.logger.error(error);
	}
};

module.exports = {
	forgotPassword
};
