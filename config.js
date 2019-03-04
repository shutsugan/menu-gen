module.exports = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 4000,
	URL: process.env.BASE_URL || 'http://localhost:4000',
	JWT_SECRET: process.env.JWT_SECRET || 'jwt_secret',
	MONGODB_URI:
		process.env.MONGODB_URI ||
		'mongodb://shutsugan:root1104@ds159185.mlab.com:59185/menu-gen'
}