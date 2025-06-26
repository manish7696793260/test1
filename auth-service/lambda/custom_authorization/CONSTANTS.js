exports.REGION = process.env.REGION;
exports.UNAUTHORIZED = 'UNAUTHORIZED';
exports.USER_TABLE = process.env.USER_TABLE;
exports.REGION = process.env.REGION;
exports.FALSE = false;
exports.TRUE = true;
exports.OCM_APP = 'OCM';
exports.ERROR_MESSAGES = {
	app: {
		'any.only': {
			errorCode: 'INVALID_APP',
			message: 'Please provide a valid app.'
		},
		'any.required': {
			errorCode: 'INVALID_APP',
			message: 'Please provide a valid app.'
		}
	}
};
exports.ERRORS = {
	INTERNAL_SERVER_ERROR: {
		CODE: 'INTERNAL_SERVER_ERROR',
		MESSAGE: 'Unexpected error occurred.'
	}
};
exports.SAMPLE = 'sample';
exports.INVOKE_LAMBDA = 'invoke lambda';
