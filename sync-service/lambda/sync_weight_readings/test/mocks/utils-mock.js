const logger = {
	error: (message) => {
		return;
	}
};

const batchWrite = async (params) => {
	for (const request of params) {
		if (request.PutRequest && request.PutRequest.Item.userId_type_deviceLocalName === 'user2_weight_Manual') {
			throw new Error();
		}
	}
	return true;
};

module.exports = {
	logger,
	batchWrite
};
