/**
	Function: auth_service_login
	Node version 20.x
	@category login API input validation File
	@Package Application
	@author Omron
	@copyright 2024 Omron
*/

const Joi = require('joi');
const CONSTANTS = require('./CONSTANTS');

// if refreshToken is present,there will be no validation for email and password
const Utility = {
	schema: Joi.object({
		emailAddress: Joi.alternatives().conditional('refreshToken', {
			is: Joi.exist(),
			then: Joi.any(),
			otherwise: Joi.string().email().required()
		}),
		refreshToken: Joi.string(),
		password: Joi.alternatives().conditional('refreshToken', {
			is: Joi.exist(),
			then: Joi.any(),
			otherwise: Joi.string().required().min(12).max(128).pattern(/^\S+$/)
		}),
		app: Joi.string().required().valid(CONSTANTS.OCM_APP)
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
