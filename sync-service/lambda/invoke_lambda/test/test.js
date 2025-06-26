const expect = require('chai').expect;
const { describe, before, after, it } = require('mocha');
const mockRequire = require('mock-require');
process.env.ENVIRONMENT = 'test';
process.env.NOTIFICATION_EMAIL_TO = 'to-alert@alert.com';
process.env.NOTIFICATION_EMAIL_FROM = 'from-alert@alert.com';
const TEST_CONSTANTS = require('./TEST-CONSTANTS');
const utils = require('./mock-require/utils-require');
let CONSTANTS;
const actualConstants = require('./../CONSTANTS');
let index;

const test = () => {
	describe(TEST_CONSTANTS.TEST_TITLE, function () {
		let testIndex = 1;
		this.timeout(10000);
		before(() => {
			process.env.global = 'test_global';
			mockRequire('utils', utils);
		});

		after(() => {
			mockRequire.stopAll();
			CONSTANTS = actualConstants;
		});

		it(`TEST ${testIndex++} Error in lambda invocation`, async () => {
			CONSTANTS = require('./../CONSTANTS');
			CONSTANTS.LAMBDAS = TEST_CONSTANTS.INVOKE_FAILED_LAMBDAS;
			index = require('./../index');
			const callback = function (_err, data) {
				expect(data.success).to.equals(false);
				expect(data.message).to.equals('Error in lambda invokation.');
			};
			await index.handler(null, null, callback);
			CONSTANTS = actualConstants;
		});

		it(`TEST ${testIndex++} Error in email send`, async () => {
			CONSTANTS = require('./../CONSTANTS');
			CONSTANTS.LAMBDAS = TEST_CONSTANTS.EMAIL_FAILED_LAMBDA;
			index = require('./../index');
			const callback = function (_err, data) {
				expect(data.success).to.equals(false);
				expect(data.message).to.equals('Error in alert email send.');
			};
			await index.handler(null, null, callback);
			CONSTANTS = actualConstants;
		});

		it(`TEST ${testIndex++} All lambdas invoked successfully`, async () => {
			CONSTANTS = require('./../CONSTANTS');
			CONSTANTS.LAMBDAS = TEST_CONSTANTS.SUCCESS_LAMBDAS;
			index = require('./../index');
			const callback = function (_err, data) {
				expect(data.success).to.equals(true);
			};
			index.handler(null, null, callback);
		});
	});
};

module.exports = {
	test
};
