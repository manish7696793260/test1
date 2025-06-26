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

		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} Successful response for a OCM User`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			const expectedResponse = {
				success: true
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} with mextPaginationKey passing to the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.nextPaginationKey = 'eyJwayI6InBrIiwic2siOiJzayJ9';
			const expectedResponse = {
				success: true
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} if any validation error comes within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.app = 'abc';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERROR_MESSAGES.app['any.only'].errorCode,
				message: CONSTANTS.ERROR_MESSAGES.app['any.only'].message
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
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} if any error occured while fetching data from DB within the system`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.userID = 'userID2';
			const expectedResponse = {
				success: false,
				errorCode: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.CODE,
				message: CONSTANTS.ERRORS.INTERNAL_SERVER_ERROR.MESSAGE
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} while fetching readings from OCM user without passing additional parameter`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			delete params.phoneIdentifier;
			delete params.lastSyncedTime;
			delete params.startTime;
			delete params.endTime;
			const expectedResponse = {
				success: true
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} while fetching readings from OC user without passing additional parameter`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			delete params.phoneIdentifier;
			delete params.lastSyncedTime;
			delete params.startTime;
			delete params.endTime;
			params.app = 'OCM';
			const expectedResponse = {
				success: true
			};
			await callIndex(params, expectedResponse);
		});
		it(`Test#${testCase++} for ${TEST_CONSTANTS.CODE_URI} while no readings fetched from OC user without passing additional parameter`, async () => {
			const params = JSON.parse(JSON.stringify(TEST_CONSTANTS.INPUTS.SUCCESS));
			params.app = 'OCM';
			params.userID = 'userID3';
			const expectedResponse = {
				success: true
			};
			await callIndex(params, expectedResponse);
		});
	});
};

module.exports = {
	test
};
