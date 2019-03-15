const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
	generateToken: ({_id, username, email, avatar}) => {
		const new_user = {id: _id, username, email, avatar};
		return jwt.sign(new_user, config.JWT_SECRET, {expiresIn: '60min'});
	},

	verifyToken: async token => jwt.verify(token, config.JWT_SECRET)
}
