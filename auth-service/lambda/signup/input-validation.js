/**
	Function: auth_service_signup
	Node version 20.x
	@category app_signup API input validation File
	@Package Application
	@author Omron
	@copyright 2024 Omron
*/

const Joi = require('joi');
const CONSTANTS = require('./CONSTANTS');

const Utility = {
	schema: Joi.object({
		app: Joi.string().required().valid(CONSTANTS.OCM_APP),
		emailAddress: Joi.string().required().email(),
		password: Joi.string().required().min(12).max(128).pattern(/^\S+$/),
		customAttributes: Joi.object().min(1).required(),
		userData: Joi.object().min(1).required()
	}),
	/**
		@name validateInput
		@description Function to validate input data
		@param {Object} Input to validate
		@returns {Object} Input validation status
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
