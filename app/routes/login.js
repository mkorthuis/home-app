exports.login = function(req, res) {
	res.render('login/index');
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.authenticateLocal = function(passport) {
	return passport.authenticate('local-signup', {
    	successRedirect : '/dashboard', // redirect to the secure profile section
    	failureRedirect : '/', // redirect back to the signup page if there is an error
    	failureFlash : true // allow flash messages
	});
};

exports.authenticateGoogle = function(passport) {
	return passport.authenticate('google', { scope : ['profile', 'email'] });
};

exports.authenticateGoogleCallback = function(passport) {
	return passport.authenticate('google', { 
		successRedirect : '/dashboard', 
		failureRedirect : '/' 
	});
};


exports.connectLocal = function(req, res) {
	res.render('connect-local', { message: req.flash('loginMessage') });
};

exports.unlinkLocal = function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
        res.redirect('/dashboard');
    });
};

exports.unlinkGoogle = function(req, res) {
    var user          = req.user;
    user.google.token = undefined;
    user.save(function(err) {
        res.redirect('/dashboard');
    });
};

exports.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
};

