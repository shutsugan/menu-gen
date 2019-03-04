const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const tirmedType = {
	type: String,
	required: true,
	trim: true
};

const normalType = {
	type: String,
	required: true
}

const avatarType = {
	type: String,
	trim: true,
	default: 'user.png'
};

const UserSchema = mongoose.Schema({
	username: tirmedType,
	email: tirmedType,
	password: normalType,
	avatar: avatarType
});

UserSchema.plugin(timestamp);

const User = mongoose.model('User', UserSchema);
module.exports = User;