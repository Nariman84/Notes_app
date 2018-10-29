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