const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findOne({email});

			bcrypt.compare(password, user.password, (err, match) => {
				if (err) reject('Someting went wrong');

				if (match) resolve(user);
				else reject('Authenticate failed');
			});
		} catch(err) {
			reject('Authentication failed');
		}
	});
};