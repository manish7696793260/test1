/**
 * @name createParamsForOCMApp
 * @description Creates the DynamoDB query parameters for the Omron Connect (OCM_APP).
 * @param {String} userID - The user ID to query readings for.
 * @param {Number} lastSyncedTime - The epoch time of the last sync.
 * @param {String} table - The DynamoDB table name.
 * @param {Number} startTime - The start time for filtering readings.
 * @param {Number} endTime - The end time for filtering readings.
 * @param {String} phoneIdentifier - The phone identifier to filter by (optional).
 * @param {String} paginationKey - The pagination key for pagination (if any).
 * @returns {Object} - The DynamoDB query parameters for VS_APP.
 */
exports.createParamsForOCMApp = (userID, lastSyncedTime, table, startTime, endTime, phoneIdentifier, paginationKey) => {
	const params = {
		TableName: table,
		KeyConditionExpression: '#uid = :id',
		ExpressionAttributeValues: {
			':id': `${userID}_weight_Manual`
		},
		ExpressionAttributeNames: {
			'#uid': 'userId_type_deviceLocalName'
		},
		ScanIndexForward: false
	};
	if (phoneIdentifier) {
		params.ExpressionAttributeValues[':phoneIdentifier'] = phoneIdentifier;
		params.ExpressionAttributeNames['#phoneIdentifier'] = 'phoneIdentifier';
		params.ExpressionAttributeNames['#attributes'] = 'attributes';
		params.FilterExpression =
			'#attributes.#phoneIdentifier <> :phoneIdentifier';
	}
	if (lastSyncedTime) {
		params.ExpressionAttributeValues[':modifiedDate'] = Number(lastSyncedTime);
		params.ExpressionAttributeNames['#modifiedDate'] = 'modifiedDate';
		params.FilterExpression = params.FilterExpression
			? `${params.FilterExpression} AND #modifiedDate >= :modifiedDate`
			: '#modifiedDate >= :modifiedDate';
	}
	if (startTime && endTime) {
		params.ExpressionAttributeValues[':fromDate'] = Number(startTime);
		params.ExpressionAttributeValues[':toDate'] = Number(endTime);
		params.ExpressionAttributeNames['#measurementDate'] = 'measurementDate';
		params.KeyConditionExpression = `${params.KeyConditionExpression} AND #measurementDate BETWEEN :fromDate AND :toDate`;
	}
	if (
		typeof paginationKey !== 'undefined' &&
		Number(paginationKey) > 0
	) {
		params.ExclusiveStartKey = {
			userID: userID,
			measurementDate: parseInt(paginationKey, 10)
		};
	}

	return params;
};
