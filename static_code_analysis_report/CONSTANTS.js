exports.PDF_NAME = `${process.env.REPOSITORY} Report`;
exports.S3_BUCKET = process.env.OPERATIONS_BUCKET;
exports.STATIC_CODE_REPORT = 'static-code-report';
exports.REPO_NAME = process.env.REPOSITORY;
exports.STATIC_CODE_REPORT_HTML_PATH = process.env.STATIC_CODE_REPORT_HTML_PATH;
exports.CLIENT_CONFIG = {
	region: process.env.REGION || process.env.AWS_REGION
};
exports.SENDER_EMAIL = process.env.STATIC_CODE_ANALYSIS_REPORT_SOURCE_EMAIL_ADDRESS || process.env.SOURCE_EMAIL_ADDRESS;
exports.RECIPIENT_EMAIL = process.env.STATIC_CODE_ANALYSIS_REPORT_DESTINATION_EMAIL_ADDRESS || process.env.DESTINATION_EMAIL_ADDRESS;

exports.ERROR_CODES = {
	UPLOAD_TO_S3_ERROR: 'ERR_UPLOAD_TO_S3',
	SEND_EMAIL_ERROR: 'ERR_SEND_EMAIL'
};
const CC_EMAILS = process.env.STATIC_CODE_ANALYSIS_REPORT_CC_EMAIL || process.env.CC_EMAIL;
exports.CC_EMAILS = CC_EMAILS ? CC_EMAILS.split(',').map(email => email.trim()) : [];
exports.HYPHEN = '-';
exports.ZERO = '0';
exports.PROJECT = process.env.PROJECT;
exports.SUPPORTED_REGION = {
	'us-west-2': 'US',
	'us-east-1': 'EAST-US',
	'eu-west-1': 'EU'
};
exports.DEFAULT_REGION_CODE = 'us-west-2';
exports.DEFAULT_REGION = 'US';
exports.STATIC_CODE_ANALYSIS_REPORT = 'Static Code Analysis Report';
exports.STATIC_CODE_ANALYSIS_REPORT_ERROR = 'Static Code Analysis Report Error';
exports.FOR = ' for ';
exports.INFO_S3_PATH = 'static-code-report-template/info-email-template.html';
exports.ERROR_S3_PATH = 'static-code-report-template/error-email-template.html';
const GLOBAL = '_global';
exports.ENV = process.env.ENV.split(GLOBAL)[0].toUpperCase();
exports.ALWAYS_SEND = process.env.ALWAYS_SEND;
exports.ALERT_TYPE = 'ALERT';
exports.INFO_TYPE = 'INFO';
exports.REPORT = 'Report';
exports.ERROR_MESSAGE = {
	NO_FILE_FOUND: 'No html file found.'
};
