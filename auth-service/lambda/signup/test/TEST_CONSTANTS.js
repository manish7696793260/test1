exports.REGION = 'us-west-2';
const codeURI = 'auth_service_signup';
exports.CODE_URI = codeURI;
exports.TITLE = `Test case for ${codeURI}`;
exports.INPUTS = {
	SUCCESS: {
		body: {
			userData: {
				name: 'john doe'
			},
			password: 'success_password@123',
			customAttributes: {
				userId: 'userID',
				app: 'app',
				vsUserID: 'vsUserID'
			},
			app: 'OCM',
			emailAddress: 'johndoe@example.com'
		}
	},
	SAMPLE: {
		type: 'sample'
	}
};
exports.SECRET_MANAGER_VALUES = JSON.stringify({
	USER_POOL_ID: 'ofs_userpool_id',
	OFC_CLIENT_ID: 'oc-cognito-client-id'
});

exports.OCM_COGNITO_CLIENT_ID = 'oc-cognito-client-id';
exports.STAGE = 'test_global';
