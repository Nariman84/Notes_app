var mongoose = require("mongoose");
var User = require("../models/users");
var async = require("async");
var HttpError = require("../error/index").HttpError;
var AuthError = require("../models/users").AuthError;

exports.get = function(request, response) {
	response.render('login_page');
	// response.sendFile(__dirname + "/public/login_page.html");
};

exports.post = function(request, response, next) {
	if (!request.body) return response.sendFile(400);
	var email = request.body.email;
	var password = request.body.password;
	var authInfo = {
		email: email,
		password: password
	};
	console.log("Введены логин и пароль: ", authInfo);
	User.authorize(email, password, function(err, user){
		if (err) {
			if (err instanceof AuthError) {
				return next (new HttpError(403, err.message));
			} else {
				return next (err);
			}
		};
		console.log("Найден user" + user);
		request.session.user = user._id;
		response.redirect("/notes");
	});
};