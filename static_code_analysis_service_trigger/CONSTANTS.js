exports.VITALSIGHT = 'vitalsight';
exports.VITALSIGHT_IP = process.env.VITALSIGHT_IP;
exports.VITALSIGHT_PORT = process.env.VITALSIGHT_PORT;
exports.MOBILE_IP = process.env.MOBILE_IP;
exports.MOBILE_PORT = process.env.MOBILE_PORT;
exports.MOBILE = 'mobile';
exports.ENDPOINT = 'generate-report';
exports.TWO = '2';
exports.ENV = process.env.ENV;
exports.TRUE = true;
exports.SUCCESS_MESSAGE = 'Static report request sent successfully';
exports.FAILURE_MESSAGE = 'Error while sending request to server';
exports.SOURCE_EMAIL = process.env.SOURCE_EMAIL;
exports.DESTINATION_EMAIL = process.env.DESTINATION_EMAIL;
const PLACEHOLDER_DATE = '{date}';
exports.PLACEHOLDER_DATE = PLACEHOLDER_DATE;
const ENVIRONMENT = '{ENVIRONMENT}';
exports.ENVIRONMENT = ENVIRONMENT;
const SUBJECT = `${process.env.REGION.split('-')[0].toUpperCase()}-${ENVIRONMENT}-ALERT-VS - Generate static report lambda trigger failed on `;
exports.SUBJECT = SUBJECT;
const ERROR = '{ERROR}';
exports.ERROR = ERROR;
const RUNBOOK_LINK = 'https://omronhealthcare-ohi.atlassian.net/wiki/spaces/ODS/pages/3057614862/ODS-Alert-Runbook+Generate+Static+Report+lambda+trigger+failure';
exports.EMAIL = {
	CONTENT: `
    <p> Hi Team, <p>
    <p> Generate Static Report Lmabda Trigger failed on ${PLACEHOLDER_DATE} with the following error.</p> 
	<p> ${ERROR} <p>
	<p>Please refer to detailed runbook at - ${RUNBOOK_LINK} </p>
    <br>
    <p>Sincerely,</p>
    <p>Connected Health R&D Team</p>
	<br>
	<p>This message is intended for designated recipients only. If you are not the authorized recipient, or you were not expecting this message, or if you have received this message in error, please delete all copies of this message. Any unauthorized use or distribution of this message is prohibited.</p>`,
	SUBJECT: SUBJECT
};
