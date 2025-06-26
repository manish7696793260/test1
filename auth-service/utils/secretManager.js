const CONSTANTS = require('./CONSTANTS');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const CLIENT = new SecretsManagerClient({
	region: CONSTANTS.REGION
});
const LOGGER = require('./logger');

/**
 * @description Get secret value from  secret manager caching service
 * @param {string} secretName
 * @returns {string} Return secret value in string
 */
const getSecretsFromCache = async (secretName) => {
	try {
		return new Promise((resolve, reject) => {
			const https = require('http');
			const options = {
				hostname: process.env.EC2_IP,
				port: process.env.PORT || 8087,
				path: `/cache/${secretName}`,
				method: 'GET',
				timeout: CONSTANTS.EC2_REQUEST_TIMEOUT
			};
			const req = https.request(options, res => {
				let secrets = '';
				res.on('data', secretChunk => {
					const buff = Buffer.from(secretChunk, 'base64');
					secretChunk = buff.toString('ascii');
					secrets += secretChunk;
				});
				res.on('end', () => {
					resolve(secrets);
				});
			});

			req.on('error', error => {
				LOGGER.log('error', error);
				resolve(JSON.stringify({
					success: false,
					message: error
				}));
			});

			req.on('timeout', () => {
				LOGGER.log(CONSTANTS.EC2_REQUEST_TIMEOUT);
				req.destroy();
			});

			req.end();
		});
	} catch (error) {
		LOGGER.log('Error while fetching secrets from caching lambda : ', error);
		return Promise.resolve(JSON.stringify({
			success: false,
			message: error
		}));
	}
};

/**
 * @description Get secret value from aws secret manager service
 * @param {string} secretName
 * @returns {string} Return secret value in string
 */
const getSecretsFromSecretManager = async (secretName) => {
	const input = { SecretId: secretName };
	const command = new GetSecretValueCommand(input);
	const data = await CLIENT.send(command);
	if ('SecretString' in data) {
		return (data.SecretString);
	} else {
		const buff = Buffer.from(data.SecretBinary, 'base64');
		return (buff.toString('ascii'));
	}
};

/**
 * @name secretFunction
 * @description Retrieves a secret from AWS Secrets Manager or caching service.
 * @returns {Promise<string>} - The secret value as a string.
 */
const secretFunction = async () => {
	const secretName = process.env.SECRET_MANAGER_NAME;
	try {
		const response = await getSecretsFromCache(secretName);
		if (JSON.parse(response).success === false) {
			throw new Error('Getting secrets from secret manager');
		}
		return response;
	} catch (error) {
		LOGGER.error('Getting secrets from secret manager');
		return await getSecretsFromSecretManager(secretName);
	}
};

exports.secretFunction = secretFunction;
