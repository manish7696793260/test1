/**
    Function: sync weight API validation
    Node version 20.x
    @category sync weight API input validation File
    @Package Application
    @author Omron
    @copyright 2024
*/

const Joi = require('joi');
const CONSTANTS = require('./CONSTANTS');

// Joi schema for sync weight API validation
const Utility = {
	schema: Joi.object({
		app: Joi.string().required().valid(CONSTANTS.OCM_APP),
		nextPaginationKey: Joi.string().allow('').optional(),
		lastSyncedTime: Joi.string().allow('').pattern(/^\d+$/).optional(),
		startTime: Joi.string().allow('').pattern(/^\d+$/),
		phoneIdentifier: Joi.string().allow('').optional(),
		endTime: Joi.string().allow('').pattern(/^\d+$/).optional(),
		userID: Joi.string().required()
	}),

	/**
        @name validateInput
        @description Function to validate input data for sync weight API
        @param {Object} input - Input data for validation
        @returns {Object} - Validation status
    */
	validateInput: (input) => {
		const validationResult = Utility.schema.validate(input, {
			abortEarly: false
		});
		if (!validationResult.error) {
			return {
				error: false
			};
		}
		return {
			error: true,
			validationResult
		};
	}
};

exports.Utility = Utility;
