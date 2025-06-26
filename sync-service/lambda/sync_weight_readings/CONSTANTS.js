exports.REGION = process.env.REGION;
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
	deleteFlag: {
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid deleteFlag.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'deleteFlag must be of type string.'
		}
	},
	isDiscarded: {
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid isDiscarded.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'isDiscarded must be of type string.'
		}
	},
	isManualEntry: {
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid isManualEntry.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'isManualEntry must be of type string.'
		}
	},
	createdDate: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'createdDate must be a valid number.'
		}
	},
	measurements: {
		'array.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'measurements must be an array.'
		},
		'array.max': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'measurements array should not contain more than 100 readings.'
		},
		'array.includesRequiredUnknowns': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Each measurement must include required fields: measurementDate, weight, weightInLbs, appVersion, bmiValue, createdDate, deviceType, measurementLocalDate, phoneIdentifier, platform, skeletalMusclePercentage, timeZone, type, userNumberInDevice.'
		}
	},
	measurementDate: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid measurementDate.'
		},
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'measurementDate must be a valid number.'
		}
	},
	measurementLocalDate: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid measurementLocalDate.'
		},
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'measurementLocalDate must be a valid number.'
		}
	},
	weightInLbs: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid weightInLbs value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'weightInLbs value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'weightInLbs must be a string.'
		}
	},
	weight: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid weight value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'weight value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'weight must be a string.'
		}
	},
	appVersion: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid appVersion value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'appVersion value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'appVersion must be a string.'
		}
	},
	bmiValue: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid bmiValue value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'bmiValue value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'bmiValue must be a string.'
		}
	},
	bodyFatLevel: {
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'bodyFatLevel value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'bodyFatLevel must be a string.'
		}
	},
	bodyFatPercentage: {
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'bodyFatPercentage value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'bodyFatPercentage must be a string.'
		}
	},
	deviceType: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid deviceType value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'deviceType value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'deviceType must be a string.'
		}
	},
	phoneIdentifier: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid phoneIdentifier value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'phoneIdentifier value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'phoneIdentifier must be a string.'
		}
	},
	platform: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid platform value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'platform value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'platform must be a string.'
		}
	},
	sequenceNumber: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'sequenceNumber must be a string.'
		}
	},
	restingMetabolism: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid restingMetabolism value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'restingMetabolism value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'restingMetabolism must be a string.'
		}
	},
	skeletalMuscleLevel: {
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'skeletalMuscleLevel value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'skeletalMuscleLevel must be a string.'
		}
	},
	skeletalMusclePercentage: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid skeletalMusclePercentage value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'skeletalMusclePercentage value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'skeletalMusclePercentage must be a string.'
		}
	},
	timeZone: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid timeZone value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'timeZone value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'timeZone must be a string.'
		}
	},
	userNumberInDevice: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid userNumberInDevice.'
		},
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid userNumberInDevice.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid userNumberInDevice.'
		}
	},
	type: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid type value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'type value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'type must be a string.'
		}
	},
	visceralFatLevel: {
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'visceralFatLevel value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'visceralFatLevel must be a string.'
		}
	},
	visceralFatLevelClassification: {
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'visceralFatLevelClassification value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'visceralFatLevelClassification must be a string.'
		}
	},
	dataSource: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'dataSource must be a string.'
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
	INVALID_APP: {
		CODE: 'INVALID_APP',
		MESSAGE: 'Please provide a valid app.'
	}
};

exports.OCM_APP = 'OCM';
exports.BOOLEAN_TRUE = true;
exports.RPM = '_rpm_';
exports.UNDER_SCORE = '_';
exports.NON_BP_READINGS = process.env.NON_BP_READINGS;
exports.WEIGHT = 'WEIGHT';
exports.VITAL = 'VITAL';
exports.USER = 'USER';
exports.READING = 'READING';
exports.BOOLEAN_TRUE = true;
exports.SAMPLE = 'sample';
exports.INVOKE_LAMBDA = 'invoke lambda';
exports.FIRST_USER = '1';
exports.SECOND_USER = '2';
exports.DEVICE_LOCAL_NAME_POST_FIX = 'weight_Manual';
exports.SUCCESS_MESSAGE = 'Measurements synced successfully.';
