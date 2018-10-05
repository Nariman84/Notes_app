// var mongoose = require("mongoose");
// var User = require("../models/users");
// var async = require("async");
// var HttpError = require("../error/index").HttpError;
// var AuthError = require("../models/users").AuthError;

exports.get = function(request, response) {
	request.session.destroy();
	response.redirect("/notes");
};