var mongoose = require("mongoose");
var moment = require("moment");
var Note = require("../models/notes");
var User = require("../models/users");
var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/usersdb";

exports.get = function(request, response, next) {
	if(!request.body) return response.sendStatus(400);
	var perPage = 30 //количество документов на каждой странице
	var page = request.params.page || 1; //номер текущей страницы
	var cursor = Note.find({author: request.session.user});
	cursor.sort({created: -1}).skip((perPage * page) - perPage).limit(perPage).exec(function(err, notes){
		Note.countDocuments({author: request.session.user}).exec(function(err, count) {
			if (err) return next(err);
			response.render('notes_page', {
				user: request.user,
				notes: notes,
				current: page,
				count: count, //количество найденных документов по заданным параметрам
				pages: Math.ceil(count / perPage) //общее количество страниц
			});
		}); 
	});
};

//добавление заметки
exports.post = function(request, response) {
	if(!request.body) return response.sendStatus(400);
	var note = new Note({
		_id: new mongoose.Types.ObjectId(),
		note_name: request.body.note_name,
		note_theme: request.body.note_theme,
		content: request.body.content,
		created: request.body.created,
		author: request.session.user
	});
	note.save(function(err, note) {
		if (err) throw err;
		console.log('note successfully saved.', note);

		return note;
	});
	response.json(note);
};