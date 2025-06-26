exports.REGION = 'us-west-2';
const codeURI = 'sync_service_sync_weight';
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
					'appVersion': '7.20.0.26 (597)',
					'bmiValue': '49.15',
					'bodyFatLevel': '-1.0',
					'bodyFatPercentage': '-1.0',
					'createdDate': 1725428762478,
					'deleteFlag': '0',
					'deviceType': 'android',
					'isDiscarded': '0',
					'isManualEntry': '1',
					'measurementDate': 1725165916000,
					'measurementLocalDate': 1725165916000,
					'phoneIdentifier': 'fe01b860440946458f8ab7927efd58a3',
					'platform': 'android',
					'restingMetabolism': '-1.0',
					'sequenceNumber': '0',
					'skeletalMuscleLevel': '-1.0',
					'skeletalMusclePercentage': '-1.0',
					'timeZone': '19800',
					'type': 'weight',
					'userNumberInDevice': '1',
					'visceralFatLevel': '-1.0',
					'visceralFatLevelClassification': '-1.0',
					'weight': '114.3',
					'weightInLbs': '0.0',
					'dataSource': ''
				}
			]
		}
	},
	SAMPLE: {
		type: 'sample'
	}
};
