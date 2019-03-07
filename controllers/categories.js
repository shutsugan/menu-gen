const Category = require('../models/categories');
const jsonResponse = require('../utils/json-response');

module.exports = {
	getUserCategories: async (req, res, next) => {
		const {user_id} = req.params;
		if (!user_id) return jsonResponse(res, 400, {message: 'Wrong user id'});

		try {
			const categories = await Category.find({user_id});
			jsonResponse(res, 200, {categories});
		} catch (err) {
			jsonResponse(res, 500, {message: err.message});
		}
	},

	getCategories: async (req, res, next) => {
		try {
			const categories = await Category.find({});
			jsonResponse(res, 200, {categories});
		} catch (err) {
			jsonResponse(res, 500, {message: err.message});
		}
	},

	getCategory: async (req, res, next) => {
		const {id} = req.params;
		if (!id) return jsonResponse(res, 400, {message: 'Wrong category id'});

		try {
			const category = await Category.findById(id);
			jsonResponse(res, 200, {category});
		} catch (err) {
			jsonResponse(res, 404, {message: 'Category not found'});
		}
	},

	setCategory: async (req, res, next) => {
		//const user_id = req.user._id;

		const {name, description, cover} = req.body;
		const user_id = '5c7d2bfe9074b547dfb639da';

		try {
			const category = new Category({name, description, cover, user_id});
			await category.save();

			jsonResponse(res, 201, {category});
		} catch (err) {
			jsonResponse(res, 424, {message: 'Failed to create new category'});
		}
	},

	updateCategory: async (req, res, next) => {
		const data = req.body;
		const {id} = req.params;
		if (!id) return jsonResponse(res, 400, {message: 'Wrong category id'});

		try {
			const category = await Category.findByIdAndUpdate(id, {$set: data});
			await category.save();

			jsonResponse(res, 201, {category});
		} catch (err) {
			jsonResponse(res, 424, {message: 'Failed to update new category'});
		}
	},

	deleteCategory: async (req, res, next) => {
		const {id} = req.params;
		if (!id) return jsonResponse(res, 400, {message: 'Wrond category id'});

		try {
			const category = await Category.findByIdAndRemove(id);
			await category.save();

			jsonResponse(res, 201, {category});
		} catch (err) {
			jsonResponse(res, 424, {message: 'Failed to delete new category'});
		}
	}
};