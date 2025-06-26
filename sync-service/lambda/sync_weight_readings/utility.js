/**
    Function: sync Weight API validation
    Node version 20.x
    @category sync Weight API input validation File
    @Package Application
    @author Omron
    @copyright 2024
*/

const Joi = require('joi');
const CONSTANTS = require('./CONSTANTS');

// Joi schema for sync Weight API validation
const Utility = {
	schema: Joi.object({
		userID: Joi.string().required(),
		app: Joi.string().required().valid(CONSTANTS.OCM_APP),
		measurements: Joi.array().items(
			Joi.object({
				measurementDate: Joi.number().required(),
				weight: Joi.string().required(),
				weightInLbs: Joi.string().required(),
				appVersion: Joi.string().required(),
				bmiValue: Joi.string().required(),
				bodyFatLevel: Joi.string().optional(),
				bodyFatPercentage: Joi.string().optional(),
				createdDate: Joi.number().required(),
				deleteFlag: Joi.string().valid('1', '0').optional(),
				deviceType: Joi.string().required(),
				isDiscarded: Joi.string().valid('1', '0').optional(),
				isManualEntry: Joi.string().valid('1', '0').optional(),
				measurementLocalDate: Joi.number().required(),
				phoneIdentifier: Joi.string().required(),
				platform: Joi.string().required(),
				restingMetabolism: Joi.string().optional(),
				sequenceNumber: Joi.string().optional(),
				skeletalMuscleLevel: Joi.string().optional(),
				skeletalMusclePercentage: Joi.string().required(),
				timeZone: Joi.string().required(),
				type: Joi.string().required(),
				userNumberInDevice: Joi.string().required().valid(CONSTANTS.FIRST_USER, CONSTANTS.SECOND_USER),
				visceralFatLevel: Joi.string().optional(),
				visceralFatLevelClassification: Joi.string().optional(),
				dataSource: Joi.string().optional().allow('')
			})
		).max(100)
	}),

	/**
        @name validateInput
        @description Function to validate input data for sync Weight API
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
