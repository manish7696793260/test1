/**
    Function: syncBP API validation
    Node version 20.x
    @category syncBP API input validation File
    @Package Application
    @author Omron
    @copyright 2024
*/

const Joi = require('joi');
const CONSTANTS = require('./CONSTANTS');

// Joi schema for syncBP API validation
const Utility = {
	schema: Joi.object({
		userID: Joi.string().required(),
		app: Joi.string().required().valid(CONSTANTS.OCM_APP),
		measurements: Joi.array().items(
			Joi.object({
				measurementDate: Joi.number().required(),
				systolic: Joi.string().required(),
				diastolic: Joi.string().required(),
				pulse: Joi.string().required(),
				userNumberInDevice: Joi.string().required().valid(CONSTANTS.FIRST_USER, CONSTANTS.SECOND_USER),
				appVersion: Joi.string().required(),
				atrialFibrillationDetection: Joi.number().optional(),
				atrialFibrillationMode: Joi.number().optional(),
				countArtifactDetection: Joi.string().optional(),
				countIrregularHB: Joi.string().optional(),
				countIrregularHeartBeat: Joi.string().optional(),
				countMeasurementErrorNightMode: Joi.number().optional(),
				countMeasurementSuccessNightMode: Joi.number().optional(),
				createdDate: Joi.number().required(),
				cuffFlag: Joi.number().valid(1, 0).optional(),
				cuffWrapDetect: Joi.number().valid(1, 0).required(),
				dateEnabled: Joi.number().valid(1, 0).optional(),
				deleteFlag: Joi.string().valid('1', '0').optional(),
				deviceSeries: Joi.string().optional(),
				deviceType: Joi.string().valid('android', 'ios').required(),
				displayedErrorCodeNightMode: Joi.number().optional(),
				errNumber: Joi.string().optional(),
				errorCodeNightMode: Joi.number().optional(),
				errorDetails: Joi.string().optional(),
				internalDeviceTemp: Joi.string().optional(),
				irregularHB: Joi.string().required(),
				irregularPulseDetection: Joi.number().required(),
				isManualEntry: Joi.string().valid('1', '0').optional(),
				latitude: Joi.string().optional(),
				longitude: Joi.string().optional(),
				meanArterialPressure: Joi.string().optional(),
				measurementKindNightMode: Joi.number().required(),
				measurementLocalDate: Joi.number().required(),
				measurementMode: Joi.number().optional(),
				measurementNumber: Joi.number().optional(),
				measurementStartDateNightMode: Joi.number().optional(),
				measurementStartingMethod: Joi.number().optional(),
				mets: Joi.string().optional(),
				movementDetect: Joi.number().valid(1, 0).optional(),
				movementError: Joi.string().valid('1', '0').optional(),
				phoneIdentifier: Joi.string().required(),
				platform: Joi.string().required(),
				positionDetect: Joi.number().optional(),
				positioningIndicator: Joi.number().optional(),
				roomTemperature: Joi.string().optional(),
				sequenceNo: Joi.string().optional(),
				timeZone: Joi.string().required(),
				timeZoneDevice: Joi.string().optional(),
				transferDate: Joi.number().optional(),
				symptoms: Joi.any().optional(),
				consumed: Joi.any().optional(),
				deviceLocalName: Joi.string().optional(),
				deviceModel: Joi.string().optional(),
				notes: Joi.string().allow('').optional(),
				deviceSerialID: Joi.string().optional()
			}).max(100)
		)
	}),

	/**
        @name validateInput
        @description Function to validate input data for syncBP API
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
