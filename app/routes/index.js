
var login = require('./login');
var dashboard = require('./dashboard');
var weather = require('./weather');
var ninja  = require('./ninja');
var sunnyPortal = require('./sunnyportal');
var foscam = require('./foscam');

module.exports = function(app, passport) {
    app.all('*',function(req, res, next) {
        console.log(req.method + " " + req.originalUrl);
        next(); 
    });

    // Handle Errors gracefully
    app.use(function(err, req, res, next) {
        if(!err) return next();
        console.log(err.stack);
        res.json({error: true});
    });

    //Login functionality
    app.get('/', login.login);
    app.post('/login', login.authenticateLocal(passport));
    app.get('/logout', login.logout);
    app.get('/auth/google', login.authenticateGoogle(passport));
    app.get('/auth/google/callback', login.authenticateGoogleCallback(passport));

    //User Management    
    app.get('/connect/local', login.isLoggedIn, login.connectLocal);
    app.get('/unlink/google', login.isLoggedIn, login.unlinkGoogle);
    app.get('/unlink/local', login.isLoggedIn, login.unlinkLocal);


    app.get('/dashboard', login.isLoggedIn, dashboard.home);

    app.get('/weather', login.isLoggedIn, weather.currentJacksonWeather);

    app.get('/ninja/temperature', login.isLoggedIn, ninja.currentTemperature);
    app.get('/ninja/humidity', login.isLoggedIn, ninja.currentHumidity);
    app.get('/ninja/pelletOn', ninja.turnPelletStoveOn);
    app.get('/ninja/pelletOff', ninja.turnPelletStoveOff);

    app.get('/sunnyportal/current', sunnyPortal.currentProduction);

    app.get('/foscam/snapshot', foscam.takeSnapshot);

};






/*
exports.index = function(req, res) {
		console.log('exports.index WOOT');
    	
    	var ninja = ninjaBlocks.app({user_access_token:'6ca1728894516c86483e8e49f48e3f86e36a28a5'});

    	ninja.devices({ device_type: 'temperature' }, function(err, devices) {
    		for (var guid in devices) {
				ninja.device(guid).last_heartbeat(function(err, data) { 
            		console.log(devices[guid].shortName+' is '+data.DA+'C');
        		})
    		}
            console.log('Completed For Loop. Total Items: ' + devices.legth);

		});

        res.render('index', { message : 'hooray! welcome to our api'});
};
*/