const expect = require('chai').expect;
const { describe, before, after, it } = require('mocha');
const mockRequire = require('mock-require');
const LAYER = require('./mocks/utils-mock');
const jwt = require('./mocks/jwt-mock');
const https = require('./mocks/https-mock');
const jwk = require('./mocks/jwktopem-mock');
const TEST_CONSTANTS = require('./TEST_CONSTANTS');
const CONSTANTS = require('../CONSTANTS');
let index;

const callIndex = async (params, expectedResponse) => {
	const response = await index.handler(params);
	console.log('ress', response);
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
			mockRequire('jsonwebtoken', jwt);
			mockRequire('https', https);
			mockRequire('jwk-to-pem', jwk);
			index = require('../index');
		});

		after(() => {
			mockRequire.stopAll();
		});

		let testCase = 1;

		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} Successful response to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			const expectedResponse = {
				success: true
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
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with invalid token within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.headers.Authorization = 'Bearer invalidToken';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.UNAUTHORIZED
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} if token expired within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.headers.Authorization = 'Bearer expiryTime';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.UNAUTHORIZED
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} if token is not verified within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.headers.Authorization = 'Bearer tokenNotVerified';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.UNAUTHORIZED
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} if token is not passed within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.headers.Authorization = '';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.UNAUTHORIZED
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} if unexpected error occured while processing token within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.headers.Authorization = 'Bearer unexpectedError';
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
