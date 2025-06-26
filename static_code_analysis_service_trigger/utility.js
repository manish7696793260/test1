const CONSTANTS = require('./CONSTANTS');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const ses = new SESClient({ region: CONSTANTS.REGION });

const sendAlertOverMail = async (content) => {
	try {
		const env = CONSTANTS.ENV.toUpperCase();
		const date = new Date().toISOString().split('T')[0];
		const params = {
			Message: {
				Body: {
					Html: {
						Data: (CONSTANTS.EMAIL.CONTENT.replace(CONSTANTS.PLACEHOLDER_DATE, date)).replace(CONSTANTS.ERROR, content)
					}
				},
				Subject: {
					Data: (CONSTANTS.EMAIL.SUBJECT + date).replace(CONSTANTS.ENVIRONMENT, env)
				}
			},
			Destination: {
				ToAddresses: CONSTANTS.DESTINATION_EMAIL.split(',').map(email => email.trim())
			},
			Source: CONSTANTS.SOURCE_EMAIL,
			ReplyToAddresses: [CONSTANTS.SOURCE_EMAIL]
		};
		const command = new SendEmailCommand(params);
		return await ses.send(command);
	} catch (err) {
		console.error('error', err);
	}
};

exports.sendAlertOverMail = sendAlertOverMail;
