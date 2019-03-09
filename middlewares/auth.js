const jsonResponse = require('../utils/json-response');
const { verifyToken } = require('../utils/generate-token');

module.exports = async (req, res, next) => {
	let token = req.headers['authorization'];
	if (!token) return next();

	try {
		token = token.replace('Bearer ', '');
		const verified_token = await verifyToken(token);
		req.user = verified_token;

		next();
	} catch (err) {
		jsonResponse(res, 401, {message: 'Register first!!'});
	}

};