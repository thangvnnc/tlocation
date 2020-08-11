'use strict';
const PORT = process.env.PORT || 9999;
const express = require('express');
const fs = require('fs');
const app = express();

// Set ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set body parser json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function (err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Server started in port: ' + PORT);
});