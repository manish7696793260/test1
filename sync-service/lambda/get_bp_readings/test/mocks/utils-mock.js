exports.getItem = async (params) => {
	if (params.ExpressionAttributeValues[':id'] === 'userID2') throw new Error();
	if (params.ExpressionAttributeValues[':id'] === 'userID3') {
		return {
			Items: [
			]
		};
	}
	return {
		Items: [
			{
				attributes: {
					systolic: 'systolic',
					weightLBS: 'weightInLBS'
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
