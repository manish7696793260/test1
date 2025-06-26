const CONSTANTS = require('./CONSTANTS.js');
const COGNITO = require('./cognito.js');
const { Utility } = require('./input-validation.js');
const LAYER = require('utils');

/**
 * @name getAppConfig
 * @description Retrieves configuration for the specified application.
 * @param {String} app - The application identifier (e.g., "VS" or "OCM").
 * @returns {Promise<Object>} - The configuration object for the app.
 */
const getAppConfig = async (app, SECRET_CONSTANT) => {
	const config = {
		OCM: {
			clientId: SECRET_CONSTANT.OFC_CLIENT_ID,
			emailVerificationRequired: true
		}
	};
	return config[`${app}`];
};

/**
 * @name applyValidation
 * @description Validates the request body for required fields.
 * @param {Object} body - The request body.
 * @returns {Object} - Validation result with success status and error details if any.
 */
const applyValidation = async ({
	emailAddress,
	app
}) => {
	const { error, validationResult } = Utility.validateInput({
		emailAddress,
		app
	});
	if (error) {
		LAYER.logger.error(validationResult);
		const key = validationResult.error.details[0].context?.key;
		const errorType = validationResult.error.details[0].type;
		return {
			success: false,
			errorCode: CONSTANTS.ERROR_MESSAGES[`${key}`][`${errorType}`]?.errorCode,
			message: CONSTANTS.ERROR_MESSAGES[`${key}`][`${errorType}`]?.message
		};
	}
	return { success: true };
};

/**
 * @name handler
 * @description AWS Lambda function handler for resending verifiction mail.
 * @param {Object} event - The event object.
 * @param {Object} context - The context object.
 * @param {Function} callback - The callback function.
 */
exports.handler = async (event, context, callback) => {
	if (event && event.type && event.type === CONSTANTS.SAMPLE) {
		return Promise.resolve({ success: CONSTANTS.BOOLEAN_TRUE, message: CONSTANTS.INVOKE_LAMBDA });
	}
	try {
		const body = event.body;
		const secretConstants = await LAYER.secretFunction();
		const SECRET_CONSTANT = JSON.parse(secretConstants);

		// Validate input
		const validationResponse = await applyValidation(body);
		if (!validationResponse.success) return validationResponse;

		const appConfig = await getAppConfig(body.app, SECRET_CONSTANT);
		const cognitoRes = await COGNITO.resendVerificationEmail(body.emailAddress.toLowerCase(), appConfig);
		if (cognitoRes.success === false) return cognitoRes;
		return {
			success: true
		};
	} catch (error) {
		LAYER.logger.error(error);
		return {
			success: false,
			errorCode: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.CODE,
			message: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.MESSAGE
		};
	}
};
