
exports.home = function(req, res) {
	res.render('dashboard', {
		user : req.user
	});
}