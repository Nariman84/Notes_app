var mongoClient = require("mongodb").MongoClient;

module.exports = function(app) {
	app.get('/signup', require('./signup').get);
	app.post('/signup', require('./signup').post);

	app.get('/login', require('./login').get);
	app.post('/login', require('./login').post);

	app.get('/notes', require('./notes').get);
	app.post('/notes', require('./notes').post);


	// поиск всех заметок в БД
	// app.get("/notes", function(request, response){

	// 	mongoClient.connect(url, {useNewUrlParser: true}, function(err, client){
	// 		client.db("usersdb").collection("notes").find({/*author: request.session.user*/}).toArray(function(err, notes){
	// 			response.send(notes);

	// 			client.close();
	// 		});
	// 	});
	// });
	//поиск одной заметки
	// app.get("/notes/:id", function(request, response){
	// 	var id = new objectId(request.params.id);
	// 	mongoClient.connect(url, {useNewUrlParser: true}, function(err, client){
	// 		client.db("usersdb").collection("notes").findOne({_id: id}, function(err, note){
	// 			if(err) return response.status(400).send();
	// 			response.send(note);
	// 			client.close();
	// 		});
	// 	});
	// });
};