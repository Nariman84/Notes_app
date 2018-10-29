var mongoose = require("mongoose");
var User = require("../models/users");
var async = require("async");

exports.get = function(request, response) {
	response.render('login_page');
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
	
	async.waterfall([
		function(callback) {
			User.findOne({email: email}, callback);
		},
		function(user, callback) {
			if (user) {
				if (user.checkPassword(password)) {
					callback(null, user);
				} else {
					var wrongPass = "Пароль неверный!"
					console.log(wrongPass);
					response.render("login_page", {
						err_auth: wrongPass
					})
				}
			} else {
				var noUser = "Пользователь с таким e-mail не зарегистрирован!";
				console.log(noUser);
				response.render("login_page", {
						err_auth: noUser
					})
			}
		}
	], function(err, user) {
		if (err) return next(err);
		console.log("Найден user " + user);
		request.session.user = user._id;
		response.redirect("/notes");
	});
};