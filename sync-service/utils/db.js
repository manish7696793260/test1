const CONSTANTS = require('./CONSTANTS');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, BatchWriteCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const dbClient = new DynamoDBClient({ region: CONSTANTS.REGION });
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
 * @name batchWrite
 * @description Writes items to a DynamoDB table in batches.
 * @param {Array} items - An array of items to be written to DynamoDB.
 * @param {String} table - The name of the DynamoDB table where the items will be written.
 * @returns {Promise<void>} - A promise that resolves when all batches are successfully written, or rejects if an error occurs.
 * @throws {Error} - Throws an error if any batch fails to write to the DynamoDB table.
 */
const batchWrite = async (items, table) => {
	const BATCH_SIZE = 20;

	for (let i = 0; i < items.length; i += BATCH_SIZE) {
		const batch = items.slice(i, i + BATCH_SIZE);
		const params = {
			RequestItems: {
				[table]: batch
			}
		};

		try {
			const command = new BatchWriteCommand(params);
			await ddbDocClient.send(command);
		} catch (error) {
			logger.error(`Error writing batch into ${table}:`, error);
			throw error;
		}
	};
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

exports.batchWrite = batchWrite;
exports.getItem = getItem;
