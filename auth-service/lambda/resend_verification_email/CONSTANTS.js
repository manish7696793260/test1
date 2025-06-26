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
	}
};
exports.ERRORS = {
	TOO_MANY_REQUESTS: {
		CODE: 'TOO_MANY_REQUESTS',
		MESSAGE: 'Cognito exceeds resend verification email API rate limits.'
	},
	INTERNAL_SERVER_ERROR: {
		CODE: 'INTERNAL_SERVER_ERROR',
		MESSAGE: 'Unexpected error occurred.'
	},
	VERIFICATION_MAIL_FAILED: {
		CODE: 'VERIFICATION_MAIL_FAILED',
		MESSAGE: 'Verification mail sent failed.'
	}
};
exports.COGNITO_ERROR = {
	USER_NOT_FOUND: 'UserNotFoundException',
	TOO_MANY_REQUESTS: 'TooManyRequestsException',
	INVALID_PARAMETER_EXCEPTION: 'InvalidParameterException'
};
exports.OCM_APP = 'OCM';
exports.BOOLEAN_TRUE = true;
exports.SAMPLE = 'sample';
exports.INVOKE_LAMBDA = 'invoke lambda';

