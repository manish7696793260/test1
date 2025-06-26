const CONSTANTS = require('./CONSTANTS.js');
const COGNITO = require('./cognito');
const LAYER = require('utils');
const Joi = require('joi');

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
 * @name validateForgotPasswordInput
 * @description Validates the forgot password request body for required fields.
 * @param {Object} body - The request body.
 * @returns {Object} - Validation result with success status and error details if any.
 */
const validateForgotPasswordInput = async ({ emailAddress, app }) => {
	const schema = Joi.object({
		emailAddress: Joi.string().email().required(),
		app: Joi.string().required().valid(CONSTANTS.OCM_APP)
	});
	const validationResult = schema.validate({ emailAddress, app }, { abortEarly: false });
	if (validationResult.error) {
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
 * @name forgotPasswordHandler
 * @description AWS Lambda function handler for forgot password.
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
		const validationResponse = await validateForgotPasswordInput(body);
		if (!validationResponse.success) return validationResponse;

		const appConfig = await getAppConfig(body.app, SECRET_CONSTANT);
		await COGNITO.forgotPassword(body.emailAddress.toLowerCase(), appConfig);
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
