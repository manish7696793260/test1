const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
const logger = require('./logger');
const lambda = new LambdaClient({ region: process.env.REGION });

exports.invokeLambda = async (params) => {
	try {
		const command = new InvokeCommand(params);
		return await lambda.send(command);
	} catch (error) {
		logger.error(`error in invoke lambda ${error}`);
		throw error;
	}
};
