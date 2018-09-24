
var User = require("../models/users");
var mongoose = require("mongoose");
exports.get = function(request, response) {
	response.render('registration_page');

	// response.sendFile('registration_page.html', { root: path.join(__dirname, '../public') });

};

exports.post = function(request, response) {
	if (!request.body) return response.sendFile(400);
	var user = new User({
		_id: new mongoose.Types.ObjectId(),
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		password: request.body.password
	});
	user.save(function(err, user){
		if (err) throw err;
		console.log('user successfully saved.', user);
	});
	response.redirect("/login");
};