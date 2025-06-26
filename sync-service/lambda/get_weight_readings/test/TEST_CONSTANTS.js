exports.REGION = 'us-west-2';
const codeURI = 'sync_service_get_weight_readings';
exports.CODE_URI = codeURI;
exports.TITLE = `Test case for ${codeURI}`;
exports.INPUTS = {
	SUCCESS: {
		userID: 'userID',
		dbIdentifier: 'hospitalDbIdentifier',
		app: 'OCM',
		startTime: '123456789',
		endTime: '123456789',
		phoneIdentifier: 'phoneIdentifier',
		lastSyncedTime: '123456789'
	},
	SAMPLE: {
		type: 'sample'
	}
};
