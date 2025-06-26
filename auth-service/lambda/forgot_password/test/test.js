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
		this.timeout(10000);

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

		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} Successful response to the system`, async () => {
			// FOR SUPER ADMIN
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
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
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with cognito error within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.body.emailAddress = 'cognitoError@user.com';
			const expectedResponse = {
				success: true
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} wit sample request to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SAMPLE));
			const expectedResponse = {
				success: true
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with internal server error within the system`, async () => {
			const params = {};
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.CODE,
				message: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
	});
};

module.exports = {
	test
};
