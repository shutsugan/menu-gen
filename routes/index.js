module.exports = app => {
	require('./users')(app);
	require('./categories')(app);
	require('./meals')(app);
};