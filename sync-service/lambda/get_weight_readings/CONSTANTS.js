exports.REGION = process.env.REGION;
exports.BOOLEAN_TRUE = true;
exports.SAMPLE = 'sample';
exports.INVOKE_LAMBDA = 'invoke lambda';
exports.ERROR_MESSAGES = {
	userID: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid userID.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid userID.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid userID.'
		}
	},
	app: {
		'any.only': {
			errorCode: 'INVALID_APP',
			message: 'Please provide a valid app.'
		},
		'any.required': {
			errorCode: 'INVALID_APP',
			message: 'Please provide a valid app.'
		}
	},
	nextPaginationKey: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'nextPaginationKey must be of type string.'
		}
	},
	lastSyncedTime: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'lastSyncedTime must be a valid number.'
		}
	},
	startTime: {
		'string.pattern.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'startTime should be number.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'startTime should be number.'
		}
	},
	endTime: {
		'string.pattern.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'endTime should be number.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'endTime should be number.'
		}
	},
	phoneIdentifier: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid phoneIdentifier.'
		}
	}
};
exports.ERRORS = {
	REQUIRED_PARAMETERS: {
		CODE: 'REQUIRED_PARAMETERS',
		MESSAGE: 'Missing required parameters: userID, app, lastSyncTime, or measurements.'
	},
	INTERNAL_SERVER_ERROR: {
		CODE: 'INTERNAL_SERVER_ERROR',
		MESSAGE: 'Unexpected error occurred.'
	},
	PROCESSING_ERROR: {
		CODE: 'PROCESSING_ERROR',
		MESSAGE: 'Error processing request.'
	},
	INVALID_APP: {
		CODE: 'INVALID_APP',
		MESSAGE: 'Please provide a valid app.'
	}
};
exports.OCM_APP = 'OCM';
exports.RPM = '_rpm_';
exports.UNDER_SCORE = '_';
exports.NON_BP_READINGS = process.env.NON_BP_READINGS;
