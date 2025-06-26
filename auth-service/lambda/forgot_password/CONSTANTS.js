exports.REGION = process.env.REGION;
exports.STAGE = process.env.STAGE;

exports.ERROR_MESSAGES = {
	emailAddress: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid emailAddress.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid emailAddress.'
		},
		'string.email': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid emailAddress.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid emailAddress.'
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
	validation: {
		'validationErorr': {
			errorCode: 'VALIDATION_ERROR',
			message: 'Validation failed.'
		}
	}
};
exports.ERRORS = {
	INTERNAL_SERVER_ERROR: {
		CODE: 'INTERNAL_SERVER_ERROR',
		MESSAGE: 'Unexpected error occurred.'
	}
};
exports.OCM_APP = 'OCM';
exports.BOOLEAN_TRUE = true;
exports.SAMPLE = 'sample';
exports.INVOKE_LAMBDA = 'invoke lambda';
