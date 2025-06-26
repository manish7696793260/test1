const CONSTANTS = require('./CONSTANTS');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand, QueryCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');
const dbClient = new DynamoDBClient({ region: CONSTANTS.REGION });
const crypto = require('crypto');
const logger = require('./logger');

const marshallOptions = {
	convertEmptyValues: false,
	removeUndefinedValues: true,
	convertClassInstanceToMap: false
};

const unmarshallOptions = {
	wrapNumbers: false
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the DynamoDB Document client.
const ddbDocClient = DynamoDBDocumentClient.from(dbClient, translateConfig);

/**
 * @name generateUserId
 * @description function to generate user ID from email
 * @param {String} email
 * @returns {String} returns sha256 double hashed email
 */
const generateUserId = (email) => {
	const userId = crypto.createHash('sha256').update(email).digest('hex');
	return crypto.createHash('sha256').update(userId).digest('hex');
};

/**
 * @name saveItem
 * @description Saves an item to a DynamoDB table.
 * @param {Object} params - Parameters for the DynamoDB PutCommand.
 * @returns {Promise<Object>} - The result of the PutCommand.
 */
const saveItem = async (params) => {
	try {
		return await ddbDocClient.send(new PutCommand(params));
	} catch (error) {
		logger.error(`Error while putting data into ${params.TableName} table: ${error}`);
		throw error;
	}
};

/**
 * @name buildRegex
 * @description Builds regex patterns for keywords.
 * @param {Array<string>} keywords - List of keywords.
 * @returns {Array<string>} - List of regex patterns.
 */
const buildRegex = (keywords) => {
	return keywords.map((keyword) => `^(?!.*${keyword.toLowerCase()}).{8,128}$`);
};

/**
 * @name verifyPassword
 * @description Verifies if a password meets the required criteria.
 * @param {string} password - The password to verify.
 * @returns {Promise<boolean>} - True if the password is valid, false otherwise.
 */
const verifyPassword = async (password) => {
	const keywordsForRegex = [...CONSTANTS.PASSWORDS.KEYWORDS];
	const regularExpressions = buildRegex(keywordsForRegex);
	regularExpressions.push(...CONSTANTS.PASSWORDS.REGEX);

	const regexMatch = regularExpressions.some((regex) => {
		return !password.match(regex);
	});

	if (regexMatch) {
		return CONSTANTS.BOOLEAN_FALSE;
	}
	const patternMatch = keywordsForRegex.some((regex) => {
		const patternRegex = password.replace(/[@$!%*#?&0-9]/g, '.');
		const smallestWord = regex.length < patternRegex.length ? regex : patternRegex;
		let incrementer = CONSTANTS.NUMBER_ZERO;
		let invalidPattern = CONSTANTS.BOOLEAN_TRUE;
		let characterMatchCount = CONSTANTS.NUMBER_ZERO;

		while (incrementer < smallestWord.length) {
			if (patternRegex[`${incrementer}`] !== '.' && regex[`${incrementer}`] !== patternRegex[`${incrementer}`]) {
				invalidPattern = CONSTANTS.BOOLEAN_FALSE;
				incrementer = smallestWord.length;
			} else if (regex[`${incrementer}`] === patternRegex[`${incrementer}`]) {
				characterMatchCount += 1;
			}
			incrementer++;
		}

		if (invalidPattern && characterMatchCount > CONSTANTS.MINCHARACTERCOUNT) {
			return invalidPattern;
		}

		return CONSTANTS.BOOLEAN_FALSE;
	});

	if (patternMatch) {
		return CONSTANTS.BOOLEAN_FALSE;
	}

	try {
		const params = {
			TableName: CONSTANTS.OFC_MASTER_TABLE,
			KeyConditionExpression: '#ptype = :ptype',
			ExpressionAttributeValues: {
				':ptype': `PASSWORD#${password}`
			},
			ExpressionAttributeNames: {
				'#ptype': 'ptype#id'
			}
		};
		const command = new QueryCommand(params);
		const { Count, Items } = await dbClient.send(command);
		if (Count > CONSTANTS.NUMBER_ZERO) {
			const matchItem = Items[CONSTANTS.NUMBER_ZERO];
			if (matchItem.isDeleted && matchItem.isDeleted === CONSTANTS.NUMBER_ONE) {
				return CONSTANTS.BOOLEAN_TRUE;
			}
			return CONSTANTS.BOOLEAN_FALSE;
		}
	} catch (error) {
		logger.error(error);
	}

	return CONSTANTS.BOOLEAN_TRUE;
};

/**
 * @name updateItem
 * @description Updates an item in DynamoDB using the provided parameters.
 * @param {Object} params - The parameters for the DynamoDB update.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const updateItem = async (params) => {
	try {
		return await ddbDocClient.send(new UpdateCommand(params));
	} catch (error) {
		logger.error(`Error while putting data into ${params.TableName} table: ${error}`);
		throw error;
	}
};

/**
 * @name getItem
 * @description queries an item in DynamoDB using the provided parameters.
 * @param {Object} params - The parameters for the DynamoDB query.
 * @returns {Promise<Object>} - The result of the query operation.
 */
const getItem = async (params) => {
	try {
		return await ddbDocClient.send(new QueryCommand(params));
	} catch (error) {
		logger.error(`Error while quering data into ${params.TableName} table: ${error}`);
		throw error;
	}
};

/**
* @name checkIfTokenUpdated
* @description function to get data from token track table
* @param {String} emailAddress
* @param {Number} tokenGeneratedTime
* @returns {Boolean} returns true if token updated, false otherwise.
*/
const checkIfTokenUpdated = async (table, emailAddress, tokenGeneratedTime) => {
	const userId = generateUserId(emailAddress);
	const params = {
	   TableName: table,
	   KeyConditionExpression: '#uid = :id AND #sk = :sk',
	   ExpressionAttributeValues: {
		   ':id': CONSTANTS.USER_ID_PREFIX + userId,
		   ':sk': CONSTANTS.USER_ID_PREFIX + userId
	   },
	   ExpressionAttributeNames: {
		   '#uid': CONSTANTS.MOBILE_TABLE_PK,
		   '#sk': CONSTANTS.MOBILE_TABLE_SK
	   }
	};
	let passwordUpdated = false;
	const { Items } = await ddbDocClient.send(new QueryCommand(params));
	if (Items.length) {
	   if (Items[0].tokenTrackUpdatedAt > tokenGeneratedTime) {
		   passwordUpdated = true;
	   }
	}

	return passwordUpdated;
};

exports.checkIfTokenUpdated = checkIfTokenUpdated;
exports.getItem = getItem;
exports.saveItem = saveItem;
exports.verifyPassword = verifyPassword;
exports.updateItem = updateItem;
exports.generateUserId = generateUserId;
