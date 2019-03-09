const app = require('./app');
const config = require('./config');
const InitDb = require('./models');

app.listen(config.PORT, _ => {
	InitDb(_ => {
		require('./routes')(app);
		console.log(`Server running on ${config.PORT}...`);
	});
});
