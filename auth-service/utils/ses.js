
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const ses = new SESClient({ region: process.env.REGION });
const logger = require('./logger');

exports.sendEmail = async (params) => {
	try {
		const command = new SendEmailCommand(params);
		return await ses.send(command);
	} catch (error) {
		logger.error(`error in ses send email ${error}`);
	}
};
