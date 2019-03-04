const mongoose = require('mongoose');
const config = require('../config');

module.exports = callback => {
	mongoose.connect(
		config.MONGODB_URI,
		{useNewUrlParser: true}
	);

	const db = mongoose.connection;
	db.on('error', err => console.log(err));
	db.once('open', callback);
};