exports.get = function(request, response) {
	request.session.destroy();
	response.redirect("/notes");
};