const { describe, before, after } = require('mocha');
const invokeLambda = require('./../lambda/invoke_lambda/test/test');
const signup = require('../lambda/signup/test/test');
const login = require('../lambda/login/test/test');
const resendVerification = require('../lambda/resend_verification_email/test/test');
const forgotPassword = require('../lambda/forgot_password/test/test');
const customAuthorization = require('./../lambda/custom_authorization/test/test');

describe('Auth Service Test', function () {
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
	signup.test();
	login.test();
	resendVerification.test();
	forgotPassword.test();
	customAuthorization.test();
});
