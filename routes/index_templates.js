var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/usersdb";

module.exports = function(app) {
	app.get('/signup', require('./signup').get);
	app.post('/signup', require('./signup').post);

	app.get('/login', require('./login').get);
	app.post('/login', require('./login').post);

	app.get('/notes', require('./notes').get);
	app.post('/notes', require('./notes').post);

};