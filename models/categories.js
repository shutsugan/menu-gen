const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const { trimedType, keyType } = require('./types');
const CoverType = {
	type: String,
	trim: true,
	default: 'cover.png'
};

const CategorySchema = mongoose.Schema({
	name: trimedType,
	description: trimedType,
	cover: CoverType,
	user_id: keyType
});

CategorySchema.plugin(timestamp);

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;