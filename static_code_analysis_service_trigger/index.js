const CONSTANTS = require('./CONSTANTS.js');
const axios = require('axios');
const UTILITY = require('./utility.js');

const determineServerUrl = async (key) => {
	const keyParts = key.split('/');
	const projectName = keyParts[1];

	if (projectName === CONSTANTS.VITALSIGHT) {
		const vitalsightIp = CONSTANTS.VITALSIGHT_IP;
		const vitalsightPort = CONSTANTS.VITALSIGHT_PORT;
		return `http://${vitalsightIp}:${vitalsightPort}`;
	} else {
		const mobileIp = CONSTANTS.MOBILE_IP;
		const mobilePort = CONSTANTS.MOBILE_PORT;
		return `http://${mobileIp}:${mobilePort}`;
	}
};

const applyValidation = async (event) => {
	try {
		const s3Record = event.Records[0].s3;
		const key = s3Record.object.key;
		const serverBaseUrl = await determineServerUrl(key);

		const response = await axios.post(`${serverBaseUrl}/${CONSTANTS.ENDPOINT}`, {
			key: key
		});

		if (response.status.toString().startsWith(CONSTANTS.TWO)) {
			return {
				success: true,
				message: CONSTANTS.SUCCESS_MESSAGE
			};
		} else {
			await UTILITY.sendAlertOverMail(response.data.message);
			return {
				success: false,
				message: CONSTANTS.FAILURE_MESSAGE,
				data: response.data
			};
		}
	} catch (error) {
		console.log('error', error);
		UTILITY.sendAlertOverMail(error);
		return {
			success: false,
			message: CONSTANTS.FAILURE_MESSAGE,
			data: error
		};
	}
};

exports.handler = async (event, context, callback) => {
	try {
		const response = await applyValidation(event);
		callback(null, response);
	} catch (error) {
		callback(error);
	}
};
