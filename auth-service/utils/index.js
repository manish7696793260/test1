const logger = require('./logger');
const secretManager = require('./secretManager');
const cognito = require('./cognito');
const {sendEmail} = require('./ses');
const {invokeLambda} = require('./lambda');
const DB = require('./db');

exports.logger = logger;
exports.secretFunction = secretManager.secretFunction;
exports.saveItem = DB.saveItem;
exports.cognitoSignup = cognito.cognitoSignup;
exports.cognitoLogin = cognito.cognitoLogin;
exports.verifyPassword = DB.verifyPassword;
exports.cognitoSendConfirmationCode = cognito.cognitoSendConfirmationCode;
exports.sendEmail = sendEmail;
exports.invokeLambda = invokeLambda;
exports.generateUserId = DB.generateUserId;
exports.getItem = DB.getItem;
exports.updateItem = DB.updateItem;
exports.cognitoForgotPassword = cognito.cognitoForgotPassword;
exports.checkIfTokenUpdated = DB.checkIfTokenUpdated;
exports.adminConfirmSignup = cognito.adminConfirmSignup;
