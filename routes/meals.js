const mealController = require('../controllers/meals');

module.exports = app => {
	app.get('/api/:user_id/meals', mealController.getUserMeals);
	app.get('/api/:category_id/category_meals', mealController.getCategoryMeals);
	app.get('/api/meals', mealController.getMeals);
	app.get('/api/meal/:id', mealController.getMeal);
	app.post('/api/meal', mealController.setMeal);
	app.put('/api/meal/:id', mealController.updateMeal);
	app.delete('/api/meal/:id', mealController.deleteMeal);
};