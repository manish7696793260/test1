const { batchWrite } = require('utils');

/**
 * @name buildOCMAppItem
 * @description Builds a DynamoDB item for the OCM_APP.
 * @param {String} userID - The user ID.
 * @param {Object} item - The reading item to be saved.
 * @param {String} app - The app identifier.
 * @param {String} date - The date to be used for createdDate and modifiedDate.
 * @returns {Object} - The DynamoDB item formatted for the OCM_APP.
 */
const buildOCMAppItem = (userID, item, app, date) => {
	return {
		PutRequest: {
			Item: {
				userID: userID,
				measurementDate: item.measurementDate,
				createdDate: date,
				modifiedDate: date,
				app: app,
				attributes: item
			}
		}
	};
};

/**
 * @name saveReadings
 * @description Saves readings to DynamoDB in batches based on app type.
 * @param {String} app - The application identifier (e.g., "VS" or "OCM").
 * @param {String} userID - The user ID to which the readings belong.
 * @param {Array} array - An array of readings to be saved.
 * @param {String} table - The name of the DynamoDB table.
 * @param {String} date - The timestamp for when the readings are being saved.
 * @returns {Promise<void>} - Resolves when all batches are written successfully.
 */
exports.saveReadings = async (app, userID, array, table, date) => {
	const items = array.map(item => {
		return buildOCMAppItem(userID, item, app, date);
	});

	return await batchWrite(items, table);
};
