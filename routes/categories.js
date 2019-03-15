const categoryControllers = require('../controllers/categories');

module.exports = app => {
	app.get('/api/:user_id/categories', categoryControllers.getUserCategories);
	app.get('/api/categories', categoryControllers.getCategories);
	app.get('/api/category/:id', categoryControllers.getCategory);
	app.post('/api/category', categoryControllers.setCategory);
	app.put('/api/category/:id', categoryControllers.updateCategory);
	app.delete('/api/category/:id', categoryControllers.deleteCategory);
};
