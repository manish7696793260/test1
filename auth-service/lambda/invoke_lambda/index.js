
const CONSTANTS = require('./CONSTANTS');
const { logger, sendEmail, invokeLambda: invokeLayerLambda } = require('utils');
let errorFunctions = [];

/**
@name sendMail
@description Call the utils's send email function for alert email
@param {String} data Alert email content
@param {String} subject Alert email subject
@returns {Void} Throws error if issue in email send
*/
const sendMail = async (data, subject) => {
	const toAdrress = process.env.NotificationEmailTo.split(',');
	const eParams = {
		Destination: {
			ToAddresses: toAdrress
		},
		Message: {
			Body: {
				Html: {
					Data: data
				}
			},
			Subject: {
				Data: `${subject}`
			}
		},
		Source: process.env.NotificationEmailFrom
	};
	try {
		await sendEmail(eParams);
	} catch (error) {
		logger.error(`error in sending email ${error}`);
		throw error;
	}
};

/**
@name invokeLambda
@description Call the utils's lambda invoke function
@param {String} name Lambda name to be invoked
@returns {Void}
*/
const invokeLambda = async name => {
	try {
		const input = {
			FunctionName: name,
			InvocationType: 'Event',
			Payload: JSON.stringify({ type: 'sample' })
		};

		await invokeLayerLambda(input);
	} catch (error) {
		errorFunctions.push({ name: name, error: error });
	}
};

/**
@name handler
@description Handles the request (Function's entry point)
@param {Object} event Contains request params
@param {Object} context Not used
@param {Function} callback Function returns the response
@returns {Void} Calls Callback function
*/
exports.handler = async (event, context, callback) => {
	const LAMBDA_FN = CONSTANTS.LAMBDAS;
	for (const fn of LAMBDA_FN) {
		await invokeLambda(`${fn}`);
	}

	if (errorFunctions.length > 0) {
		let message = '<ol>';
		for (const fn of errorFunctions) {
			message += `<li><b>Function: ${
				fn.name
			}</b><br> <b>Error:</b> ${JSON.stringify(fn.error)}</li>`;
		}
		message += '</ol>';
		const emailContent = CONSTANTS.CONTENT.replace(CONSTANTS.ERROR_PLACEHOLDER, message);
		try {
			await sendMail(emailContent, CONSTANTS.SUBJECT);
			callback(null, {
				success: false,
				message: 'Error in lambda invokation.'
			});
		} catch (error) {
			callback(null, {
				success: false,
				message: 'Error in alert email send.'
			});
		}
	} else {
		callback(null, {
			success: true,
			message: 'Lambda invoked successfully.'
		});
	}
	errorFunctions = [];
};
