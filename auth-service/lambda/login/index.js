const CONSTANTS = require('./CONSTANTS.js');
const COGNITO = require('./cognito');
const { Utility } = require('./input-validation');
const LAYER = require('utils');
const DB = require('./db.js');

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
			emailVerificationRequired: true,
			table: CONSTANTS.OFC_MOBILE_TABLE
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
	password,
	app,
	refreshToken
}) => {
	const { error, validationResult } = Utility.validateInput({
		app,
		emailAddress,
		password,
		refreshToken
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
 * @description AWS Lambda function handler for user login and token regeneration.
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
		let authResult;
		if (body.refreshToken) {
			// Handle token regeneration request
			authResult = await COGNITO.refreshToken(body.refreshToken, appConfig);
			authResult.RefreshToken = body.refreshToken;
		} else {
			const userID = LAYER.generateUserId(body.emailAddress);
			// getting user details from DB
			const userDetails = await DB.getUserData(userID, appConfig.table);

			// checking for account lockout
			if (userDetails.length && userDetails[0].lockoutAttributes) {
				const validateUser = await DB.lockoutUser(userDetails, false, appConfig.table);
				if (!validateUser.success) {
					return {
						success: false,
						errorCode: CONSTANTS.ERRORS.ACCOUNT_LOCKOUT.CODE,
						message: CONSTANTS.ERRORS.ACCOUNT_LOCKOUT.MESSAGE
					};
				}
			};
			// Handle login request
			authResult = await COGNITO.authenticateUser(body.emailAddress.toLowerCase(), body.password, appConfig, userDetails);
		}
		if (authResult.success === false) {
			if (authResult.RefreshToken) delete authResult.RefreshToken;
			return authResult;
		}
		return {
			success: true,
			accessToken: authResult.AccessToken,
			refreshToken: authResult.RefreshToken,
			idToken: authResult.IdToken,
			expiresIn: authResult.ExpiresIn,
			tokenType: authResult.TokenType
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
