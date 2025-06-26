
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const ses = new SESClient({ region: process.env.REGION });
const logger = require('./logger');
/**
 * Sends an email using AWS SES (Simple Email Service).
 * @param {Object} params - The parameters required to send the email.
 * @returns {Promise<Object>} - The response from the SES send email request.
 * @throws {Error} - Logs an error message if the email sending fails.
 */
exports.sendEmail = async (params) => {
	try {
		const command = new SendEmailCommand(params);
		return await ses.send(command);
	} catch (error) {
		logger.error(`error in ses send email ${error}`);
	}
};
