const STAGE = process.env.STAGE;
exports.STAGE = STAGE;
exports.LAMBDAS = [
	`${STAGE}_common_auth_service_signup`,
	`${STAGE}_common_auth_service_login`,
	`${STAGE}_common_auth_service_resend_verification_email`,
	`${STAGE}_common_auth_service_forgot_password`,
	`${STAGE}_common_auth_service_custom_authorization`
];
const SUPPORTED_REGION = {
	'us-west-2': 'US',
	'us-east-1': 'EAST-US',
	'eu-west-1': 'EU'
};
const currentRegion = process.env.REGION || 'us-west-2';
const REGION = SUPPORTED_REGION[`${currentRegion}`];
const ENV = process.env.ENV.toUpperCase();
exports.SUBJECT = `${REGION}-${ENV}-ALERT-Invoke Lambda - Omron-Foresight-BE-Common`;
const ERROR_PLACEHOLDER = '{{ERROR}}';
exports.ERROR_PLACEHOLDER = ERROR_PLACEHOLDER;
exports.CONTENT = `Hi team,
<br><br>
Following lambda functions returned with error:<br><br>
${ERROR_PLACEHOLDER}
<br>Please refer to detailed runbook at - https://omronhealthcare-ohi.atlassian.net/wiki/spaces/ODS/pages/2804514869/ODS-Alert-Runbook+US-+ENV+-ALERT+-+Error+invoking+Lamda <br><br>Sincerely,<br>Connected Health R&D Team<br><br>This message is intended for designated recipients only. If you are not the authorized recipient, or you were not expecting this message, or if you have received this message in error, please delete all copies of this message. Any unauthorized use or distribution of this message is prohibited.`;
