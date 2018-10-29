var User = require("../models/users");

module.exports = function(request, response, next) {
	if (!request.session.user) return next();

	User.findById(request.session.user, function(err, user) {
		if (err) return next(err);
		request.user = response.locals.user = user;
		next();
	});
};