const bcrypt = require('bcryptjs');

const User = require('../models/Users');
const auth = require('../utils/auth');
const jsonResponse = require('../utils/json-response');
const { generateToken, verifyToken } = require('../utils/generate-token');

module.exports = {
	getUser: async (req, res, next) => {
		const {user} = req;
		jsonResponse(res, 200, {user});
	},

	resigter: (req, res, next) => {
		const {username, email, password, avatar} = req.body;
		const user = new User({username, email, password, avatar});

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, async (err, hash) => {
				user.password = hash;

				try {
					await user.save();
					const token = generateToken(user.toJSON());

					jsonResponse(res, 201, {token});
				} catch (err) {
					jsonResponse(res, 424, {message: 'Failed to create new user'});
				}
			});
		});
	},

	auth: async (req, res, next) => {
		const {email, password} = req.body;

		try {
			const user = await auth.authenticate(email, password);
			const token = generateToken(user.toJSON());

			jsonResponse(res, 201, {token});
		} catch (err) {
			jsonResponse(res, 403, {message: err});
		}
	}
};