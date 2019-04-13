const Meal = require('../models/meals');
const jsonResponse = require('../utils/json-response');

module.exports = {
	getUserMeals: async (req, res, next) => {
		const {user_id} = req.params;
		if (!user_id) jsonResponse(res, 400, {message: 'User id not found'});

		try {
			const meals = await Meal.find({user_id});
			jsonResponse(res, 200, {meals});
		} catch (err) {
			jsonResponse(res, 500, {message: err.message});
		}
	},

	getCategoryMeals: async (req, res, next) => {
		const {category_id} = req.params;
		if (!category_id) jsonResponse(res, 400, {message: 'Category id not found'});

		try {
			const meals = await Meal.find({category_id});
			jsonResponse(res, 200, {meals});
		} catch (err) {
			jsonResponse(res, 500, {message: err.message});
		}
	},

	getMeals: async (req, res, next) => {
		try {
			const meals = await Meal.find({});
			jsonResponse(res, 200, {meals});
		} catch (err) {
			jsonResponse(res, 500, {message: err.message});
		}
	},

	getMeal: async (req, res, next) => {
		const {id} = req.params;
		if (!id) jsonResponse(res, 400, {message: 'Meal id not found'});

		try {
			const meal = await Meal.findById(id);
			jsonResponse(res, 200, {meal})
		} catch (err) {
			jsonResponse(res, 404, {message: err.message});
		}
	},

	setMeal: async (req, res, next) => {
		const {name, description, price, category_id, user_id, image} = req.body;

		try {
			const meal = new Meal({
				name,
				description,
				price,
				image,
				category_id,
				user_id
			});
			await meal.save();

			jsonResponse(res, 201, {meal});
		} catch (err) {
			jsonResponse(res, 424, {message: err.message});
		}
	},

	updateMeal: async (req, res, next) => {
		const data = req.body;
		const {id} = req.params;
		if (!id) jsonResponse(res, 400, {message: 'id not found'});

		try {
			const meal = await Meal.findByIdAndUpdate(id, {$set: data});
			await meal.save();

			const new_meal = await Meal.findById(id);
			jsonResponse(res, 201, {meal: new_meal});
		} catch (err) {
			jsonResponse(res, 424, {message: err.message});
		}
	},

	deleteMeal: async (req, res, next) => {
		const {id} = req.params;
		if (!id) jsonResponse(res, 400, {message: 'id not found'});


		try {
			const meal = await Meal.findByIdAndRemove(id);
			await meal.save();

			jsonResponse(res, 201, {meal});
		} catch (err) {
			jsonResponse(res, 424, {message: err.message});
		}
	}
};
