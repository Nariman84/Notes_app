var mongoose = require("mongoose");
var Note = require("../models/notes");

exports.get = function(request, response, next) {
	if (!request.body) return response.sendStatus(400);
	var id = request.params.id;
	Note.find({_id: id}, {_id: 0}, function(err, note) {

		if (err) return next(err);
		console.log("найдена заметка ", note);
		response.json(note);
	});
};

exports.delete = function(request, response, next) {
	if (!request.body) return response.sendStatus(400);
	var id = request.params.id;
	Note.remove({_id: id}, function(err) {
		if (err) return next(err);
		console.log("Заметка удалена");
	});
};

// exports.put = function(request, response, next) {
// 	if (!request.body) return response.sendStatus(400);
// 	var newNoteNname = request.body.note_name;
// 	var note_theme = request.body.note_theme;
// 	var content = request.body.content;

// 	var id = request.params.id;
// 	Note.findOneAndUpdate({_id: id}, {note_name: newNoteNname}, {new: true}, function(err, note) {
// 		if (err) return next(err);
// 		console.log("Заметка отредактирована");
// 	});
// };
