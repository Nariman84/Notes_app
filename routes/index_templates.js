var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/usersdb";

module.exports = function(app) {
	app.get('/signup', require('./signup').get);
	app.post('/signup', require('./signup').post);

	app.get('/login', require('./login').get);
	app.post('/login', require('./login').post);

	app.get('/logout', require('./logout').get);

	app.get('/notes', require('./notes').get);
	app.post('/notes', require('./notes').post);

	app.get('/notes/:page', require('./notes').get);

	app.get('/notes/:page/:id', require('./note').get);
	app.delete('/notes/:page/:id', require('./note').delete);
};