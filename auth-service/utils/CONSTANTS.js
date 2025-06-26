exports.LOGLEVELS = process.env.LOGLEVELS.split(',').map((item) => item.trim());
exports.REGION = process.env.REGION;
exports.STAGE = process.env.STAGE;
exports.PASSWORDS = {
	KEYWORDS: [
		'test',
		'admin',
		'orm',
		'ipagent',
		'omron',
		'sample',
		'staff',
		'super',
		'root',
		'agent',
		'password',
		'superadmin',
		'root',
		'qwerty'
	],
	REGEX: []
};
exports.BOOLEAN_FALSE = false;
exports.BOOLEAN_TRUE = true;
exports.NUMBER_ZERO = 0;
exports.NUMBER_ONE = 1;
exports.MINCHARACTERCOUNT = 2;
exports.OFC_MASTER_TABLE = process.env.OFC_MASTER_TABLE;
exports.EC2_REQUEST_TIMEOUT = 1000;
exports.MOBILE_TABLE_PK = 'ptype#id';
exports.MOBILE_TABLE_SK = 'stype#sk';
exports.USER_ID_PREFIX = 'USER#';
