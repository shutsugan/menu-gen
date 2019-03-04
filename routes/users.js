const userController = require('../controllers/users');

module.exports = app => {
	app.post('/api/register', userController.resigter);
	app.post('/api/auth', userController.auth);
};