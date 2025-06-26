const CONSTANTS = require('./CONSTANTS');
const LAYER = require('utils');

/**
 * Prepares user attributes for the Cognito user pool.
 * @param {Object} customAttributes - Custom attributes of the user.
 * @returns {Array} - An array of user attributes.
 */
const prepareUserAttributes = (customAttributes) => {
	const attributeList = [];

	attributeList.push({ Name: 'custom:appName', Value: customAttributes.app });
	attributeList.push({ Name: 'custom:userId', Value: customAttributes.userId });
	if (customAttributes.vsUserID) {
		attributeList.push({ Name: 'custom:vsUserID', Value: customAttributes.vsUserID });
	}

	return attributeList;
};

/**
 * Adds a user to the Cognito user pool with the provided attributes.
 * @param {Object} config - Configuration object containing clientId and emailVerificationRequired.
 * @param {string} emailAddress - Email address of the user.
 * @param {string} password - Password of the user.
 * @param {Object} customAttributes - Custom attributes of the user to be saved in Cognito.
 * @returns {Object} - The response from the Cognito service.
 * @throws Throws an error if user addition fails.
 */
const addUserToPool = async (config, emailAddress, password, customAttributes) => {
	const { clientId } = config;
	const attributeList = prepareUserAttributes(customAttributes);
	const params = {
		ClientId: clientId,
		Username: emailAddress,
		Password: password,
		UserAttributes: attributeList,
		ValidationData: [{ Name: 'email', Value: emailAddress }]
	};
	try {
		const response = await LAYER.cognitoSignup(params);
		return response;
	} catch (err) {
		LAYER.logger.error(err);
		const response = {
			success: false,
			errorCode: '',
			message: ''
		};
		switch (err.name) {
		case CONSTANTS.COGNITO_ERROR.USER_ALREADY_EXISTS:
			response.errorCode = CONSTANTS.ERRORS.PROCESSING_ERROR.CODE;
			response.message = CONSTANTS.ERRORS.PROCESSING_ERROR.MESSAGE;
			break;
		case CONSTANTS.COGNITO_ERROR.PASSWORD_CONSTRAINT:
			response.errorCode = CONSTANTS.ERRORS.INVALID_PASSWORD_STRING.CODE;
			response.message = CONSTANTS.ERRORS.INVALID_PASSWORD_STRING.MESSAGE;
			break;
		case CONSTANTS.COGNITO_ERROR.TOO_MANY_REQUESTS:
			response.errorCode = CONSTANTS.ERRORS.TOO_MANY_REQUESTS.CODE;
			response.message = CONSTANTS.ERRORS.TOO_MANY_REQUESTS.MESSAGE;
			break;
		default:
			response.errorCode = CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.CODE;
			response.message = CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.MESSAGE;
			break;
		}
		return response;
	}
};

exports.addUserToPool = addUserToPool;
