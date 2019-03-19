const bcrypt = require('bcryptjs');

const User = require('../models/Users');
const auth = require('../utils/auth');
const jsonResponse = require('../utils/json-response');
const { generateToken } = require('../utils/generate-token');

module.exports = {
	getUser: async (req, res, next) => {
		const {user} = req;
		if (!user) return jsonResponse(res, 401, {message: 'User not found'});

		jsonResponse(res, 200, {user});
	},

	resigter: (req, res, next) => {
		const {username, email, password, avatar} = req.body;

		User.find({email}, (err, user) => {
			if (user.length) {
				return jsonResponse(res, 403, {message: 'Email already exists'});
			}

			const new_user = new User({username, email, password, avatar});
			bcrypt.genSalt(10, (err, salt) => {
				if (err) return jsonResponse(res, 400, {message: 'Operation failed'});

				bcrypt.hash(new_user.password, salt, async (err, hash) => {
					new_user.password = hash;

					try {
						await new_user.save();
						const token = generateToken(new_user.toJSON());

						jsonResponse(res, 201, {token});
					} catch (err) {
						jsonResponse(res, 424, {message: 'Failed to create new user'});
					}
				});
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
