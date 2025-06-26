const CONSTANTS = require('./CONSTANTS.js');
const { Utility } = require('./input-validation');
const LAYER = require('utils');
const COGNITO = require('./cognito');

/**
 * @name getAppConfig
 * @description Retrieves configuration for the specified application.
 * @param {String} app - The application identifier (e.g., "VS").
 * @returns {Promise<Object>} - The configuration object for the app.
 */
const getAppConfig = async (app, SECRET_CONSTANT) => {
	const config = {
		OCM: {
			clientId: SECRET_CONSTANT.OFC_CLIENT_ID,
			emailVerificationRequired: true,
			table: CONSTANTS.USER_TABLE
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
	app,
	emailAddress,
	password,
	customAttributes,
	userData
}) => {
	const { error, validationResult } = Utility.validateInput({
		app,
		emailAddress,
		password,
		customAttributes,
		userData
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
 * @name saveUserToDB
 * @description Saves user data to DynamoDB.
 * @param {String} userTable - The DynamoDB table name.
 * @param {Object} userData - The user data to save.
 * @returns {Promise<Object>} - The response from DynamoDB.
 */
const saveUserToDB = async (userData, config) => {
	const obj = {
		TableName: config.table,
		Item: userData
	};
	await LAYER.saveItem(obj);
};

/**
 * @name handler
 * @description AWS Lambda function handler for user signup.
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
		const validationResponse = await applyValidation(body);
		if (!validationResponse.success) return validationResponse;
		const appConfig = await getAppConfig(body.app, SECRET_CONSTANT);

		const validPassword = await LAYER.verifyPassword(body.password.toLowerCase());
		if (!validPassword) {
			return {
				success: false,
				message: CONSTANTS.ERRORS.COMPROMISED_PASSWORD.MESSAGE,
				errorCode: CONSTANTS.ERRORS.COMPROMISED_PASSWORD.CODE
			};
		}
		const cognitoRes = await COGNITO.addUserToPool(appConfig, body.emailAddress.toLowerCase(), body.password, body.customAttributes);
		if (cognitoRes.success === false) return cognitoRes;
		await saveUserToDB(body.userData, appConfig);
		return {
			success: true,
			message: CONSTANTS.SUCCESS_MESSAGE
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
