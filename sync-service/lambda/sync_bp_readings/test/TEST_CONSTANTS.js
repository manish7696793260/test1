exports.REGION = 'us-west-2';
const codeURI = 'sync_service_sync_bp';
exports.CODE_URI = codeURI;
exports.TITLE = `Test case for ${codeURI}`;
exports.INPUTS = {
	SUCCESS: {
		body: {
			userID: 'userID',
			dbIdentifier: 'hospitalDbIdentifier',
			app: 'OCM',
			measurements: [
				{
					'appVersion': '7.21.0.2 (597)',
					'atrialFibrillationDetection': 0,
					'atrialFibrillationMode': 0,
					'consumed': {},
					'countArtifactDetection': '0',
					'countIrregularHB': '0',
					'countIrregularHeartBeat': '0',
					'countMeasurementErrorNightMode': 0,
					'countMeasurementSuccessNightMode': 0,
					'createdDate': 1726122861825,
					'cuffFlag': 1,
					'cuffWrapDetect': 1,
					'dateEnabled': 0,
					'deleteFlag': '0',
					'deviceSeries': 'other',
					'deviceType': 'android',
					'diastolic': '88',
					'displayedErrorCodeNightMode': 0,
					'errNumber': '0',
					'errorCodeNightMode': 0,
					'errorDetails': '0',
					'internalDeviceTemp': '0',
					'irregularHB': '0',
					'irregularPulseDetection': 0,
					'isManualEntry': '1',
					'latitude': '0.0',
					'longitude': '0.0',
					'meanArterialPressure': '0',
					'measurementDate': 1724567942000,
					'measurementKindNightMode': 0,
					'measurementLocalDate': 1724567942000,
					'measurementMode': 0,
					'measurementNumber': 0,
					'measurementStartDateNightMode': 0,
					'measurementStartingMethod': 0,
					'mets': '0.0',
					'movementDetect': 0,
					'movementError': '0',
					'phoneIdentifier': 'e15092ff5a16447daca28be8ba83ff09',
					'platform': 'android',
					'positionDetect': 0,
					'positioningIndicator': 0,
					'pulse': '55',
					'roomTemperature': 'null',
					'sequenceNo': '0',
					'symptoms': {},
					'systolic': '111',
					'timeZone': '19800',
					'timeZoneDevice': '0',
					'transferDate': 1726122852915,
					'userNumberInDevice': '1',
					'deviceLocalName': 'blesmart_000000b1ff61c60fb7f3',
					'deviceModel': 'BP7350CAN',
					'notes': '',
					'deviceSerialID': '0000091F0200C06F8719'
				}
			]
		}
	},
	SAMPLE: {
		type: 'sample'
	}
};
