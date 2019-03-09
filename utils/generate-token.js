const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
	generateToken: ({username, email, avatar}) => {
		const new_user = {username, email, avatar};
		return jwt.sign(new_user, config.JWT_SECRET, {expiresIn: '60min'});
	},

	verifyToken: async token => jwt.verify(token, config.JWT_SECRET)
}