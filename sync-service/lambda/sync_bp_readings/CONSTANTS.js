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
	measurements: {
		'array.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'measurements must be an array.'
		},
		'array.max': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'measurements array do not contain more than 100 readings.'
		},
		'array.includesRequiredUnknowns': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Each measurement must include required fields: measurementDate, systolic, diastolic, pulse.'
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
	atrialFibrillationDetection: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'atrialFibrillationDetection must be a valid number.'
		}
	},
	atrialFibrillationMode: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'atrialFibrillationMode must be a valid number.'
		}
	},
	measurementKindNightMode: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid measurementKindNightMode.'
		},
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'measurementKindNightMode must be a valid number.'
		}
	},
	countMeasurementErrorNightMode: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'countMeasurementErrorNightMode must be a valid number.'
		}
	},
	movementDetect: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'movementDetect must be a valid number.'
		},
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid movementDetect.'
		}
	},
	countMeasurementSuccessNightMode: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'countMeasurementSuccessNightMode must be a valid number.'
		}
	},
	createdDate: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid createdDate.'
		},
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'createdDate must be a valid number.'
		}
	},
	irregularPulseDetection: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid irregularPulseDetection.'
		},
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'irregularPulseDetection must be a valid number.'
		}
	},
	positionDetect: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'positionDetect must be a valid number.'
		}
	},
	positioningIndicator: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'positioningIndicator must be a valid number.'
		}
	},
	cuffFlag: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'cuffFlag must be a valid number.'
		},
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid cuffFlag.'
		}
	},
	errorCodeNightMode: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'errorCodeNightMode must be a valid number.'
		}
	},
	transferDate: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'transferDate must be a valid number.'
		}
	},
	cuffWrapDetect: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid cuffWrapDetect.'
		},
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'cuffWrapDetect must be a valid number.'
		},
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid cuffWrapDetect.'
		}
	},
	dateEnabled: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'dateEnabled must be a valid number.'
		},
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid dateEnabled.'
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
	displayedErrorCodeNightMode: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'displayedErrorCodeNightMode must be a valid number.'
		}
	},
	measurementMode: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'measurementMode must be a valid number.'
		}
	},
	measurementNumber: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'measurementNumber must be a valid number.'
		}
	},
	measurementStartDateNightMode: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'measurementStartDateNightMode must be a valid number.'
		}
	},
	measurementStartingMethod: {
		'number.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'measurementStartingMethod must be a valid number.'
		}
	},
	systolic: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid systolic value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'systolic value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'systolic must be a string.'
		}
	},
	diastolic: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid diastolic value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'diastolic value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'diastolic must be a string.'
		}
	},
	pulse: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid pulse value.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Pulse value cannot be empty.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Pulse value must be a string.'
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
	appVersion: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid appVersion.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid appVersion.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'appVersion value cannot be empty.'
		}
	},
	countArtifactDetection: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid countArtifactDetection.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'countArtifactDetection value cannot be empty.'
		}
	},
	countIrregularHB: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid countIrregularHB.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'countIrregularHB value cannot be empty.'
		}
	},
	countIrregularHeartBeat: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid countIrregularHeartBeat.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid countIrregularHeartBeat.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'countIrregularHeartBeat value cannot be empty.'
		}
	},
	deleteFlag: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid deleteFlag.'
		},
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid deleteFlag.'
		}
	},
	deviceSeries: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid deviceSeries.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'deviceSeries value cannot be empty.'
		}
	},
	deviceType: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid deviceType.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid deviceType.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'deviceType value cannot be empty.'
		},
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid deviceType.'
		}
	},
	errNumber: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid errNumber.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'errNumber value cannot be empty.'
		}
	},
	errorDetails: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid errorDetails.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'errorDetails value cannot be empty.'
		}
	},
	notes: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid notes.'
		}
	},
	deviceLocalName: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid deviceLocalName.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'deviceLocalName value cannot be empty.'
		}
	},
	deviceSerialID: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid deviceSerialID.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'deviceSerialID value cannot be empty.'
		}
	},
	deviceModel: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid deviceModel.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'deviceModel value cannot be empty.'
		}
	},
	internalDeviceTemp: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid internalDeviceTemp.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'internalDeviceTemp value cannot be empty.'
		}
	},
	irregularHB: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid irregularHB.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid irregularHB.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'irregularHB value cannot be empty.'
		}
	},
	isManualEntry: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid isManualEntry.'
		},
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid isManualEntry.'
		}
	},
	latitude: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid latitude.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'latitude value cannot be empty.'
		}
	},
	longitude: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid longitude.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'longitude value cannot be empty.'
		}
	},
	meanArterialPressure: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid meanArterialPressure.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'meanArterialPressure value cannot be empty.'
		}
	},
	phoneIdentifier: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid phoneIdentifier.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid phoneIdentifier.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'phoneIdentifier value cannot be empty.'
		}
	},
	timeZone: {
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid timeZone.'
		},
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid timeZone.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'timeZone value cannot be empty.'
		}
	},
	mets: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid mets.'
		}
	},
	movementError: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid movementError.'
		},
		'any.only': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid movementError.'
		}
	},
	platform: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid platform.'
		},
		'any.required': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid platform.'
		},
		'string.empty': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'platform value cannot be empty.'
		}
	},
	roomTemperature: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid roomTemperature.'
		}
	},
	sequenceNo: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid sequenceNo.'
		}
	},
	timeZoneDevice: {
		'string.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'Please provide a valid timeZoneDevice.'
		}
	},
	symptoms: {
		'object.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'symptoms must be an object.'
		}
	},
	consumed: {
		'object.base': {
			errorCode: 'REQUIRED_PARAMETERS',
			message: 'consumed must be an object.'
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
exports.BOOLEAN_TRUE = true;
exports.RPM = '_rpm_';
exports.UNDER_SCORE = '_';
exports.BP_READINGS = process.env.BP_READINGS;
exports.BP = 'BP';
exports.VITAL = 'VITAL';
exports.USER = 'USER';
exports.READING = 'READING';
exports.BOOLEAN_TRUE = true;
exports.SAMPLE = 'sample';
exports.INVOKE_LAMBDA = 'invoke lambda';
exports.FIRST_USER = '1';
exports.SECOND_USER = '2';
exports.SUCCESS_MESSAGE = 'Measurements synced successfully.';
