var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var path = require('path');
var flash = require('connect-flash');

module.exports = function(app, express, passport) {
	
	app.use(express.static(path.join(__dirname, '../public')));

	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser()); // get information from html forms

	app.set('views', path.join(__dirname, './views'));
	app.set('view engine', 'jade');

	app.use(expressSession({ secret: 'canadianskickass' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash());

};