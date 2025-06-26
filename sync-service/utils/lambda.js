const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
const logger = require('./logger');
const lambda = new LambdaClient({ region: process.env.REGION });

/**
 * Invokes an AWS Lambda function using the AWS SDK.
 * @param {Object} params - Parameters required to invoke the Lambda function.
 * @returns {Promise<Object>} - The response from the Lambda function invocation.
 * @throws {Error} - Throws an error if the invocation fails, which will be logged using the logger.
 */
exports.invokeLambda = async (params) => {
	try {
		const command = new InvokeCommand(params);
		return await lambda.send(command);
	} catch (error) {
		logger.error(`error in invoke lambda ${error}`);
		throw error;
	}
};
