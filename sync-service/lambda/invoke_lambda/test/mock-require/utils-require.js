const TEST_CONSTANTS = require('./../TEST-CONSTANTS');
const logger = {
	error: () => {
		return console.error();
	}
};

const sendEmail = async (params) => {
	if (params.Message.Body.Html.Data.includes(TEST_CONSTANTS.EMAIL_FAILED_LAMBDA_NAME)) {
		throw new Error('Error in email send.');
	}
	return true;
};

const invokeLambda = (input) => {
	if (TEST_CONSTANTS.INVALID_LAMBDA.includes(input.FunctionName)) {
		throw new Error('invalid');
	}
	return true;
};

module.exports = {
	logger,
	sendEmail,
	invokeLambda
};
