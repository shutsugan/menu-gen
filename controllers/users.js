const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');
const auth = require('../utils/auth');
const jsonResponse = require('../utils/json-response');
const config = require('../config');

module.exports = {
	resigter: (req, res, next) => {
		const {username, email, password, avatar} = req.body;
		const user = new User({username, email, password, avatar});

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, async (err, hash) => {
				user.password = hash;

				try {
					await user.save();
					jsonResponse(res, 201, {message: 'User created successfully'});
				} catch(err) {
					jsonResponse(res, 424, {message: 'Failed to create new user'});
				}
			});
		});
	},

	auth: async (req, res, next) => {
		const {email, password} = req.body;

		try {
			const user = await auth.authenticate(email, password);
			const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {expiresIn: '60min'});

			jsonResponse(res, 201, {token});
		} catch(err) {
			jsonResponse(res, 403, {message: err});
		}
	}
};