const https = require('https');
const jwkToPem = require('jwk-to-pem');
const CONSTANTS = require('./CONSTANTS');

const Utility = {
	/**
   * @name getPem
   * @description Function to Configuring Identity Providers for Your User Pool
   * @param {String} USERPOOLID User pool id
   * @returns {String} IDP details
   */
	getPem: (USERPOOLID) => {
		const url = `https://cognito-idp.${CONSTANTS.REGION}.amazonaws.com/${USERPOOLID}/.well-known/jwks.json`;
		return new Promise((resolve, reject) => {
			https.get(url, (resp) => {
				let data = '';
				resp.on('data', (chunk) => {
					data += chunk;
				});
				resp.on('end', () => {
					const pems = {};
					const body = JSON.parse(data);
					const keys = body.keys;
					for (let i = 0; i < keys.length; i++) {
						const keyId = keys[`${i}`].kid;
						const modulus = keys[`${i}`].n;
						const exponent = keys[`${i}`].e;
						const keyType = keys[`${i}`].kty;
						const jwk = { kty: keyType, n: modulus, e: exponent };
						const pem = jwkToPem(jwk);
						pems[`${keyId}`] = pem;
					}
					resolve(pems);
				});
			}).on('error', (err) => {
				reject('Error: ' + err.message);
			});
		});
	}
};

module.exports = Utility;
