exports.getItem = async (params) => {
	if (params.ExpressionAttributeValues[':id'] === 'userID2_weight_Manual') throw new Error();
	if (params.ExpressionAttributeValues[':id'] === 'userID3_weight_Manual') {
		return {
			Items: [
			]
		};
	}
	return {
		Items: [
			{
				attributes: {
					weight: 'weight',
					weightInLBS: 'weightInLBS'
				}
			}
		],
		LastEvaluatedKey: 'abcd'
	};
};

exports.logger = {
	error: (message) => {
		return;
	}
};
