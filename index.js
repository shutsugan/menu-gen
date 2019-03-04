const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');
const InitDb = require('./models');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(config.PORT, _ => {
	InitDb(_ => {
		require('./routes/users')(app);
		console.log(`Server running on ${config.PORT}...`);
	});
});
