const decode = (key) => {
	if (key === 'invalidToken') {
		return {};
	}
	if (key === 'unexpectedError') {
		throw new Error('custom');
	}
	if (key === 'expiryTime') {
		return {
			payload: {
				exp: 1,
				email: 'email',
				auth_time: 2520008000,
				kid: 'kid'
			},
			header: {
				kid: 'kid'
			}
		};
	}
	return {
		payload: {
			exp: 2524608000,
			email: 'email',
			auth_time: 2520008000,
			kid: 'kid'
		},
		header: {
			kid: 'kid'
		}
	};
};

const verify = (tok) => {
	if (tok === 'tokenNotVerified') {
		throw new Error('not verified');
	} else return true;
};

module.exports = {
	decode,
	verify
};
