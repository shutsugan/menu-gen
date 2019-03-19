const userController = require('../controllers/users');
const verifyAuth = require('../middlewares/auth');

module.exports = app => {
	app.get('/api/user', verifyAuth, userController.getUser);
	app.post('/api/register', userController.resigter);
	app.post('/api/auth', userController.auth);
};
