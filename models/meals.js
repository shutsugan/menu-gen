const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const { trimedType, trimedNumberType, keyType } = require('./types');

const imageType = {
	type: String,
	trim: true
};

const MealSchema = mongoose.Schema({
	name: trimedType,
	description: trimedType,
	price: trimedNumberType,
	image: imageType,
	category_id: keyType,
	user_id: keyType
});

MealSchema.plugin(timestamp);

const Meal = mongoose.model('Meal', MealSchema);
module.exports = Meal;