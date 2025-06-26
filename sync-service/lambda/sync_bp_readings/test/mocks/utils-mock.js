const logger = {
	error: (message) => {
		return;
	}
};

const batchWrite = async (params) => {
	for (const request of params) {
		if (request.PutRequest && request.PutRequest.Item.userID === 'user4') {
			throw new Error();
		}
	}
	return true;
};

module.exports = {
	logger,
	batchWrite
};
