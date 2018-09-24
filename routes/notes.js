var mongoose = require("mongoose");
var Note = require("../models/notes");
var User = require("../models/users");

exports.get = function(request, response, next) {
	User.findById(request.session.user, function(err, user) {
		if (err) return next(err);
		response.render('notes_page', {
			user: user.firstName + " " + user.lastName
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
}