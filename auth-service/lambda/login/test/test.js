const expect = require('chai').expect;
const { describe, before, after, it } = require('mocha');
const mockRequire = require('mock-require');
const LAYER = require('./mocks/utils-mock');
const TEST_CONSTANTS = require('./TEST_CONSTANTS');
const CONSTANTS = require('../CONSTANTS');
let index;

const callIndex = async (params, expectedResponse) => {
	const response = await index.handler(params);
	expect(response.success).to.equal(expectedResponse.success);
	if (expectedResponse.message) expect(response.message).to.equal(expectedResponse.message);
	if (expectedResponse.errorCode) expect(response.errorCode).to.equal(expectedResponse.errorCode);
};

const test = async () => {
	describe(TEST_CONSTANTS.TITLE, function () {
		this.timeout(50000);

		before(() => {
			process.env.OCM_COGNITO_CLIENT_ID = TEST_CONSTANTS.OCM_COGNITO_CLIENT_ID;
			process.env.VS_COGNITO_CLIENT_ID = TEST_CONSTANTS.VS_COGNITO_CLIENT_ID;
			process.env.REGION = TEST_CONSTANTS.REGION;
			process.env.STAGE = TEST_CONSTANTS.STAGE;
			mockRequire('utils', LAYER);
			index = require('../index');
		});

		after(() => {
			mockRequire.stopAll();
		});

		let testCase = 1;
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} Successful login to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			const expectedResponse = {
				success: true
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} Successful token generation within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.REFRESH_TOKEN_EVENT));
			const expectedResponse = {
				success: true
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with email as empty string as a input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = '';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.emailAddress['string.empty'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.emailAddress['string.empty'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with email missing as an input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			delete params.body.emailAddress;
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.emailAddress['any.required'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.emailAddress['any.required'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with invalid email format as an input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'sasd@dsddc';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.emailAddress['string.email'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.emailAddress['string.email'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with email type rather than a string as an input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 1231232;
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.emailAddress['string.base'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.emailAddress['string.base'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with app missing as an input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			delete params.body.app;
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.app['any.required'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.app['any.required'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with app as some other name as an input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.app = 'abcd';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.app['any.only'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.app['any.only'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with password as empty string as an input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.password = '';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.password['string.empty'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.password['string.empty'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with password length less than minimum char required as an input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.password = 'abc';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.password['string.min'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.password['string.min'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with password length more than maximum char required as an input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.password = 'abssssssssssssddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddc';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.password['string.max'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.password['string.max'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with password as some other type rather than string as an input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.password = 132332323;
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.password['string.base'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.password['string.base'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with password missing as an input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			delete params.body.password;
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.password['any.required'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.password['any.required'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with password as invalid input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.password = 'ab . @ cd';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.password['string.pattern.base'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.password['string.pattern.base'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with refreshToken as some other type rather than string as an input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.REFRESH_TOKEN_EVENT));
			params.body.refreshToken = 132332323;
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.refreshToken['string.base'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.refreshToken['string.base'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with refreshToken as invalid input to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.REFRESH_TOKEN_EVENT));
			params.body.refreshToken = '';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.refreshToken['string.empty'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.refreshToken['string.empty'].message
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with cognito errors wwithin the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'usernotfound1@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INVALID_GRANT.CODE,
				message: CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with cognito errors wwithin the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'invalidParameter@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INVALID_GRANT.CODE,
				message: CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with cognito errors wwithin the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'tooManyRequests@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INVALID_GRANT.CODE,
				message: CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with cognito errors wwithin the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'limitExceeded@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.LIMIT_EXCEEDED.CODE,
				message: CONSTANTS.ERRORS.LIMIT_EXCEEDED.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with cognito errors wwithin the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'notAuthorized@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INVALID_GRANT.CODE,
				message: CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with cognito errors wwithin the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'passwordReset@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.RESET_PASSWORD_EXCEPTION.CODE,
				message: CONSTANTS.ERRORS.RESET_PASSWORD_EXCEPTION.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with cognito errors wwithin the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'invalidGrant@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INVALID_GRANT.CODE,
				message: CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with cognito errors wwithin the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'userNotConfirmed@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.PROCESSING_ERROR.CODE,
				message: CONSTANTS.ERRORS.PROCESSING_ERROR.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with cognito errors wwithin the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.REFRESH_TOKEN_EVENT));
			params.body.refreshToken = 'tokenNotAuthorized@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INVALID_REFRESH_TOKEN.CODE,
				message: CONSTANTS.ERRORS.INVALID_REFRESH_TOKEN.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with cognito errors wwithin the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.REFRESH_TOKEN_EVENT));
			params.body.refreshToken = 'invalidGrant@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INVALID_GRANT.CODE,
				message: CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with sample request to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SAMPLE));
			const expectedResponse = {
				success: true
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with y unexpected error within the system`, async () => {
			const params = {};
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.CODE,
				message: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} if user has exceeded attempts within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'userExceedAttempts@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INVALID_GRANT.CODE,
				message: CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} if user has exceeded attempts and hs lockout time left within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'userExceedAttemptsNLockoutLeft@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.ACCOUNT_LOCKOUT.CODE,
				message: CONSTANTS.ERRORS.ACCOUNT_LOCKOUT.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} if user has max invalid attempts left within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'maxInvalidAttempts@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.ACCOUNT_LOCKOUT.CODE,
				message: CONSTANTS.ERRORS.ACCOUNT_LOCKOUT.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} if user does not have invalid attempts key within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'noAttemptKey@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.ACCOUNT_LOCKOUT.CODE,
				message: CONSTANTS.ERRORS.ACCOUNT_LOCKOUT.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} if any error occur while fetching user details within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'userNotFound@user.com';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INVALID_GRANT.CODE,
				message: CONSTANTS.ERRORS.INVALID_GRANT.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
	});
};

module.exports = {
	test
};
