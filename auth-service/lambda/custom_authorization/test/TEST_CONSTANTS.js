exports.REGION = 'us-west-2';
const codeURI = 'auth_service_custom_authorization';
exports.CODE_URI = codeURI;
exports.TITLE = `Test case for ${codeURI}`;
exports.INPUTS = {
	SUCCESS: {
		body: {
			app: 'OCM'
		},
		headers: {
			Authorization: 'bearer token'
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
