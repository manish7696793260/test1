const jwt = require('jsonwebtoken');
const Utility = require('./utility');
const CONSTANTS = require('./CONSTANTS');
const LAYER = require('utils');
const Joi = require('joi');

/**
 * @name validateInput
 * @description Validates the forgot password request body for required fields.
 * @param {Object} body - The request body.
 * @returns {Object} - Validation result with success status and error details if any.
 */
const validateInput = async ({ app }) => {
	const schema = Joi.object({
		app: Joi.string().required().valid(CONSTANTS.OCM_APP)
	});
	const validationResult = schema.validate({ app }, { abortEarly: false });
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
 * @name handleTokenVerification
 * @description Verifies the JWT token and calls the callback function with the appropriate response.
 * @param {Object} token - JWT token.
 * @param {Object} SECRET_CONSTANT - Secret constants.
 * @param {Function} callback - Callback function to return response.
 * @returns {Promise:Object}
 */
const handleTokenVerification = async (app, token, SECRET_CONSTANT) => {
	try {
		const decodedJwt = jwt.decode(token, { complete: CONSTANTS.TRUE });
		if (!decodedJwt || !decodedJwt.payload || !decodedJwt.payload.exp || !decodedJwt.payload.email) {
			return {
				success: CONSTANTS.FALSE,
				errorCode: CONSTANTS.UNAUTHORIZED
			};
		}
		const expiryTime = new Date(decodedJwt.payload.exp * 1000).getTime();
		const generatedTime = new Date(decodedJwt.payload.auth_time * 1000).getTime();
		const currentTime = new Date().getTime();
		const email = decodedJwt.payload.email;
		const userID = decodedJwt.payload['custom:userId'] || null;
		const tableName = CONSTANTS.USER_TABLE;
		const [pems, passwordUpdated] = await Promise.all([
			Utility.getPem(SECRET_CONSTANT.USER_POOL_ID),
			LAYER.checkIfTokenUpdated(tableName, email, generatedTime)
		]);
		const pem = pems[decodedJwt.header.kid];
		if (passwordUpdated || expiryTime < currentTime) {
			return {
				success: false,
				errorCode: CONSTANTS.UNAUTHORIZED
			};
		}
		try {
			jwt.verify(token, pem);
		} catch (error) {
			return {
				success: false,
				errorCode: CONSTANTS.UNAUTHORIZED
			};
		}
		return {
			success: true,
			data: {
				emailAddress: email,
				userID: userID
			}
		};
	} catch (error) {
		LAYER.logger.log(error);
		throw error;
	}
};

/**
 * @name applyValidation
 * @description Controller function
 * @param {Object} event - Contains request params.
 * @param {Function} callback - Callback function to return response.
 * @returns {Promise<Object>} - Calls Callback function (Response code 401 for Unauthorized).
 */
const applyValidation = async (event) => {
	try {
		const validationResponse = await validateInput(event.body);
		if (!validationResponse.success) {
			return validationResponse;
		}
		const secretConstants = await LAYER.secretFunction();
		const SECRET_CONSTANT = JSON.parse(secretConstants);
		const token = event.headers.Authorization.split(' ')[1];
		if (!token) {
			return {
				success: false,
				errorCode: CONSTANTS.UNAUTHORIZED
			};
		}
		const data = await handleTokenVerification(event.body.app, token, SECRET_CONSTANT);
		return data;
	} catch (error) {
		LAYER.logger.log(error);
		return {
			success: false,
			errorCode: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.CODE,
			message: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.MESSAGE
		};
	}
};

/**
 * @name handler
 * @description Handles the request (Function's entry point)
 * @param {Object} event - Contains request params.
 * @param {Object} context - Not used.
 * @param {Function} callback - Function returns the response.
 * @returns {Void} - Calls Callback function (Response code 401 for Unauthorized).
 */
exports.handler = async (event, context, callback) => {
	if (event && event.type && event.type === CONSTANTS.SAMPLE) {
		return Promise.resolve({ success: CONSTANTS.TRUE, message: CONSTANTS.INVOKE_LAMBDA });
	}
	const response = await applyValidation(event);
	return response;
};
