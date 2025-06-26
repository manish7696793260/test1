exports.REGION = process.env.REGION;
exports.STAGE = process.env.STAGE;

exports.ERROR_MESSAGES = {
	app: {
		'any.only': {
			errorCode: 'INVALID_APP',
			message: 'Please provide a valid app'
		},
		'any.required': {
			errorCode: 'INVALID_APP',
			message: 'Please provide a valid app'
		}
	},
	emailAddress: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid emailAddress.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid emailAddress.'
		},
		'string.email': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid emailAddress.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid emailAddress.'
		}
	},
	password: {
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid password.'
		},
		'string.min': {
			errorCode: 'INVALID_PASSWORD_STRING',
			message: 'Please provide a valid password.'
		},
		'string.max': {
			errorCode: 'INVALID_PASSWORD_STRING',
			message: 'Please provide a valid password.'
		},
		'string.base': {
			errorCode: 'INVALID_PASSWORD_STRING',
			message: 'Please provide a valid password.'
		},
		'any.required': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid password.'
		},
		'string.pattern.base': {
			errorCode: 'INVALID_PASSWORD_STRING',
			message: 'Please provide a valid password.'
		}
	},
	customAttributes: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid customAttributes.'
		}
	},
	userData: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid userData.'
		}
	}
};

exports.COGNITO_ERROR = {
	USER_ALREADY_EXISTS: 'UsernameExistsException',
	PASSWORD_CONSTRAINT: 'InvalidParameterException',
	TOO_MANY_REQUESTS: 'TooManyRequestsException'
};
exports.OCM_APP = 'OCM';
exports.ERRORS = {
	INTERNAL_SERVER_ERROR: {
		CODE: 'INTERNAL_SERVER_ERROR',
		MESSAGE: 'INTERNAL_SERVER_ERROR'
	},
	PROCESSING_ERROR: {
		CODE: 'PROCESSING_ERROR',
		MESSAGE: 'Error processing request'
	},
	INVALID_PASSWORD_STRING: {
		CODE: 'INVALID_PASSWORD_STRING',
		MESSAGE: 'Password validation failed'
	},
	TOO_MANY_REQUESTS: {
		CODE: 'TOO_MANY_REQUESTS',
		MESSAGE: 'Cognito exceeds signup API rate limits'
	},
	USER_POOL_NOT_FOUND: {
		CODE: 'USER_POOL_NOT_FOUND',
		MESSAGE: 'Specified user pool ID does not exist'
	},
	COMPROMISED_PASSWORD: {
		CODE: 'COMPROMISED_PASSWORD',
		MESSAGE: 'The password entered is one of the known compromised passwords. Please enter a different password.'
	}
};
exports.SUCCESS_MESSAGE = 'User signed up successfully';
exports.USER_TABLE = process.env.USER_TABLE;
exports.OFC_MASTER_TABLE = process.env.OFC_MASTER_TABLE;
exports.BOOLEAN_TRUE = true;
exports.SAMPLE = 'sample';
exports.INVOKE_LAMBDA = 'invoke lambda';
