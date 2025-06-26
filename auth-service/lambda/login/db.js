const CONSTANTS = require('./CONSTANTS.js');
const LAYER = require('utils');

/**
 * @name getUserData
 * @description Retrieves user data from the database based on the user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - The user data items.
 */
const getUserData = async (userId, table) => {
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
		},
		ProjectionExpression: 'userID, lockoutAttributes'
	};
	try {
		const { Items } = await LAYER.getItem(params);
		return Items;
	} catch (error) {
		return [];
	}
};

/**
 * @name updatelockoutDetails
 * @description Updates the lockout details of a user in the database.
 * @param {string} userId - The ID of the user.
 * @param {Object} lockoutDetails - The lockout details to update.
 * @returns {Promise<Object>} - The updated item.
 */
const updatelockoutDetails = async (userId, lockoutDetails, table) => {
	const params = {
		TableName: table,
		Key: {
			[`${CONSTANTS.MOBILE_TABLE_PK}`]: CONSTANTS.USER_ID_PREFIX + userId,
			[`${CONSTANTS.MOBILE_TABLE_SK}`]: CONSTANTS.USER_ID_PREFIX + userId
		},
		UpdateExpression:
			'SET lockoutAttributes = :lockoutDetails, modifiedDate = :modifiedDate',
		ExpressionAttributeValues: {
			':lockoutDetails': lockoutDetails,
			':modifiedDate': new Date().getTime()
		},
		ReturnValues: 'ALL_NEW'
	};
	return await LAYER.updateItem(params);
};

/**
 * @name lockoutUser
 * @description Determines if a user should be locked out based on login attempts and updates the lockout details.
 * @param {Array} userDetails - The details of the user.
 * @param {boolean} flag - A flag to bypass the lockout check.
 * @returns {Promise<boolean>} - True if the user is locked out, false otherwise.
 */
const lockoutUser = async (userDetails, flag, table) => {
	if (
		userDetails &&
		userDetails.length > 0 &&
		userDetails[0].lockoutAttributes &&
		userDetails[0].lockoutAttributes.lockoutTime < Date.now() && !flag
	) {
		return {
			success: true
		};
	}
	const loginAttemptTime = Date.now();
	let invalidLoginAttempts = 1;
	let lockoutTime = 0;
	let lockoutFlag = false;
	if (
		userDetails &&
		userDetails[0] &&
		userDetails[0].lockoutAttributes &&
		userDetails[0].lockoutAttributes.invalidLoginAttempts
	) {
		invalidLoginAttempts =
			Number(userDetails[0].lockoutAttributes.invalidLoginAttempts) + 1;
		if (invalidLoginAttempts === CONSTANTS.INVALID_LOGIN_MAX_LIMIT) {
			lockoutTime = Date.now() + CONSTANTS.MILISEC_1_MIN;
			lockoutFlag = true;
		} else if (
			invalidLoginAttempts > CONSTANTS.INVALID_LOGIN_MAX_LIMIT &&
			userDetails[0].lockoutAttributes.lockoutTime > loginAttemptTime
		) {
			invalidLoginAttempts =
				Number(userDetails[0].lockoutAttributes.invalidLoginAttempts) + 1;
			lockoutTime =
				Date.now() +
				CONSTANTS.MILISEC_1_MIN *
					(invalidLoginAttempts - CONSTANTS.INVALID_LOGIN_MAX_LIMIT + 1);
		} else if (
			invalidLoginAttempts > CONSTANTS.INVALID_LOGIN_MAX_LIMIT &&
			userDetails[0].lockoutAttributes.lockoutTime < loginAttemptTime
		) {
			invalidLoginAttempts = 1;
		}
	}
	invalidLoginAttempts = invalidLoginAttempts.toString();
	const lockoutDetails = {
		lockoutTime,
		invalidLoginAttempts
	};
	await updatelockoutDetails(userDetails[0].userID, lockoutDetails, table);
	return {
		success: false,
		lockoutFlag
	};
};

module.exports.lockoutUser = lockoutUser;
module.exports.getUserData = getUserData;
