const { getItem } = require('utils');
const { createParamsForOCMApp } = require('./oc-params.js');

/**
 * @name fetchReadings
 * @description Fetches readings from DynamoDB where the modified date is greater than the last sync time.
 * @param {String} app - The app name (VS_APP or OCM_APP).
 * @param {String} userID - The user ID to query readings for.
 * @param {String} table - The DynamoDB table name.
 * @param {Number} lastSyncedTime - The epoch time of the last sync.
 * @param {String} paginationKey - Optional pagination key for paginated requests.
 * @returns {Promise<Array>} - A promise that resolves to an array of readings.
 */
const fetchReadings = async (app, userID, table, startTime, endTime, lastSyncedTime, phoneIdentifier, paginationKey = null) => {
	try {
		const params = createParamsForOCMApp(userID, Number(lastSyncedTime), table, Number(startTime), Number(endTime), phoneIdentifier, paginationKey);
		const data = await getItem(params);
		return data;
	} catch (error) {
		console.error('Error fetching readings:', error);
		throw error;
	}
};

exports.fetchReadings = fetchReadings;
