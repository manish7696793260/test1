const { describe, before, after } = require('mocha');
const invokeLambda = require('./../lambda/invoke_lambda/test/test');
const syncBpReadings = require('./../lambda/sync_bp_readings/test/test');
const syncWeightReadings = require('./../lambda/sync_weight_readings/test/test');
const getBpReadings = require('./../lambda/get_bp_readings/test/test');
const getWeightReadings = require('./../lambda/get_weight_readings/test/test');

describe('Sync Service Test', function () {
	this.timeout(30000);
	const localConsole = { ...console };
	before(() => {
		console.log = console.error = console.info = () => ('');
	});
	after(() => {
		console.log = localConsole.log;
		console.error = localConsole.error;
		console.info = localConsole.info;
	});
	invokeLambda.test();
	syncBpReadings.test();
	syncWeightReadings.test();
	getBpReadings.test();
	getWeightReadings.test();
});
