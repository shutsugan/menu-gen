const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const { trimedType, normalType } = require('./types');
const avatarType = {
	type: String,
	trim: true,
	default: 'user.png'
};

const UserSchema = mongoose.Schema({
	username: trimedType,
	email: trimedType,
	password: normalType,
	avatar: avatarType
});

UserSchema.plugin(timestamp);

const User = mongoose.model('User', UserSchema);
module.exports = User;