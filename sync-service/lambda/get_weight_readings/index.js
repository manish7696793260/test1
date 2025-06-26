const CONSTANTS = require('./CONSTANTS');
const LAYER = require('utils');
const DB = require('./db');
const { Utility } = require('./utility');

/**
 * @name getAppConfig
 * @description Retrieves configuration for the specified application.
 * @param {String} app - The application identifier (e.g.,"OCM").
 * @returns {Promise<Object>} - The configuration object for the app.
 */const getAppConfig = async (app) => {
	const config = {
		OCM: {
			table: CONSTANTS.NON_BP_READINGS
		}
	};
	return config[`${app}`].table;
};

/**
 * @name applyValidation
 * @description Validates the request body for required fields.
 * @param {Object} body - The request body.
 * @returns {Object} - Validation result with success status and error details if any.
 */
const applyValidation = async ({
	userID,
	app,
	lastSyncedTime,
	nextPaginationKey,
	startTime,
	endTime,
	phoneIdentifier
}) => {
	const { error, validationResult } = Utility.validateInput({
		userID,
		app,
		lastSyncedTime,
		nextPaginationKey,
		startTime,
		endTime,
		phoneIdentifier
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
		const validationResponse = await applyValidation(event);
		if (!validationResponse.success) return validationResponse;

		const table = await getAppConfig(event.app);

		const readings = await DB.fetchReadings(event.app, event.userID, table, event.startTime, event.endTime, event.lastSyncedTime, event.phoneIdentifier, event.nextPaginationKey);
		const response = {
			success: true,
			data: []
		};
		if (readings?.Items?.length > 0) {
			readings.Items.forEach((reading) => {
				let attributes = { ...reading.attributes };
				attributes.app = reading.app || event.app;
				response.data.push(attributes);
			});
		}
		if (readings.LastEvaluatedKey) {
			if (event.app === CONSTANTS.OCM_APP) {
				response.nextPaginationKey = readings.LastEvaluatedKey.measurementDate;
			}
		}

		return response;
	} catch (error) {
		LAYER.logger.error(error);
		return {
			success: false,
			errorCode: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.CODE,
			message: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.MESSAGE
		};
	}
};
