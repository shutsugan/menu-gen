const mongoose = require('mongoose');

exports.trimedType = {
	type: String,
	required: true,
	trim: true
};

exports.trimedNumberType = {
	type: Number,
	required: true,
	trim: true
};

exports.normalType = {
	type: String,
	required: true
};

exports.keyType = {
	type: mongoose.Schema.Types.ObjectId,
	required: true
};