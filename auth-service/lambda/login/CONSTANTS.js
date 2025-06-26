exports.REGION = process.env.REGION;
exports.STAGE = process.env.STAGE;

exports.ERROR_MESSAGES = {
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
	refreshToken: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid token.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid token.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETER',
			message: 'Please provide a valid token.'
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
	REQUIRED_PARAMETERS: {
		CODE: 'REQUIRED_PARAMETERS',
		MESSAGE: 'Missing required parameters: emailAddress, password, app'
	},
	INTERNAL_SERVER_ERROR: {
		CODE: 'INTERNAL_SERVER_ERROR',
		MESSAGE: 'Unexpected error occurred.'
	},
	PROCESSING_ERROR: {
		CODE: 'PROCESSING_ERROR',
		MESSAGE: 'Error processing request'
	},
	INVALID_GRANT: {
		CODE: 'INVALID_GRANT',
		MESSAGE: 'Invalid credentials'
	},
	RESET_PASSWORD_EXCEPTION: {
		CODE: 'RESET_PASSWORD_REQUIRED',
		MESSAGE: 'Password reset is required for the user'
	},
	LIMIT_EXCEEDED: {
		CODE: 'PASSWORD_ATTEMPTS_EXCEEDED',
		MESSAGE: 'Your account has been temporarily locked due to too many unsuccessful password entry attempts. Please try again in some time or reset your password.'
	},
	INVALID_REFRESH_TOKEN: {
		CODE: 'INVALID_REFRESH_TOKEN',
		MESSAGE: 'Invalid Refresh Token'
	},
	ACCOUNT_LOCKOUT: {
		CODE: 'ACCOUNT_LOCKOUT',
		MESSAGE: 'Your account has been temporarily locked due to too many unsuccessful password entry attempts. Please try again in some time or reset your password.'
	}
};

exports.COGNITO_ERROR = {
	USER_NOT_FOUND: 'UserNotFoundException',
	PASSWORD_CONSTRAINT: 'InvalidParameterException',
	TOO_MANY_REQUESTS: 'TooManyRequestsException',
	NOT_AUTHORIZED_EXCEPTION: 'NotAuthorizedException',
	RESET_PASSWORD_EXCEPTION: 'PasswordResetRequiredException',
	LIMIT_EXCEEDED: 'LimitExceededException',
	USER_NOT_CONFIRMED: 'UserNotConfirmedException'
};
exports.OCM_APP = 'OCM';
exports.BOOLEAN_TRUE = true;
exports.SAMPLE = 'sample';
exports.INVOKE_LAMBDA = 'invoke lambda';
exports.INVALID_LOGIN_MAX_LIMIT = 5;
exports.LOCKOUT_INCREASE_TIME = 1;
exports.MILISEC_1_MIN = 1 * 60 * 1000;
exports.MOBILE_TABLE_PK = 'ptype#id';
exports.MOBILE_TABLE_SK = 'stype#sk';
exports.USER_ID_PREFIX = 'USER#';
exports.OFC_MOBILE_TABLE = process.env.OFC_MOBILE_TABLE;
exports.USER_NOT_FOUND = 'user details not found in database';
