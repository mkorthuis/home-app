var weather = require('./weather');
var ninja = require('./ninja');

module.exports = function() {
	console.log('Setting up scheduler');
	
	weather.scheduleHomeWeather();
	ninja.scheduleTemperature();
	ninja.captureDoorBellData();
}