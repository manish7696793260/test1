/**
	Function: auth_service_resend_verifiction_mail
	Node version 20.x
	@category resend verification mail API input validation File
	@Package Application
	@author Omron
	@copyright 2024 Omron
*/

const Joi = require('joi');
const CONSTANTS = require('./CONSTANTS');

const Utility = {
	schema: Joi.object({
		emailAddress: Joi.string().email().required(),
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
