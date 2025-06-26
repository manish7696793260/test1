const CONSTANTS = require('./CONSTANTS');
const { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, ResendConfirmationCodeCommand, ForgotPasswordCommand } = require('@aws-sdk/client-cognito-identity-provider');
const cognitoClient = new CognitoIdentityProviderClient({ region: CONSTANTS.REGION });

/**
 * @name cognitoSignup
 * @param {Object} params - Parameters for signing up a user (e.g., Username, Password, UserAttributes).
 * @returns {Promise<Object>} - Response from Cognito with user information.
 */
const cognitoSignup = async (params) => {
	const command = new SignUpCommand(params);
	return await cognitoClient.send(command);
};

/**
 * @name cognitoLogin
 * @param {Object} params - Parameters for logging a user (e.g., Username, Password, UserAttributes).
 * @returns {Promise<Object>} - Response from Cognito with user information.
 */
const cognitoLogin = async (params) => {
	const command = new InitiateAuthCommand(params);
	return await cognitoClient.send(command);
};

/**
 * @name cognitoSendConfirmationCode
 * @param {Object} params - Parameters for logging a user (e.g., Username, Password, UserAttributes).
 * @returns {Promise<Object>} - Response from Cognito with user information.
 */
const cognitoSendConfirmationCode = async (params) => {
	const command = new ResendConfirmationCodeCommand(params);
	return await cognitoClient.send(command);
};

/**
* @name cognitoForgotPassword
* @param {Object} params - Parameters for signing up a user (e.g., Username, Password, UserAttributes).
* @returns {Promise<Object>} - Response from Cognito with user information.
*/
const cognitoForgotPassword = async (params) => {
	const command = new ForgotPasswordCommand(params);
	return await cognitoClient.send(command);
};

exports.cognitoSignup = cognitoSignup;
exports.cognitoLogin = cognitoLogin;
exports.cognitoSendConfirmationCode = cognitoSendConfirmationCode;
exports.cognitoForgotPassword = cognitoForgotPassword;
