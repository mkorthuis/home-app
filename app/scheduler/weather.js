
var CronJob = require('cron').CronJob;
var WeatherService = require('../services/weather');

exports.scheduleHomeWeather = function() {
	console.log('Schedule Home Weather');
	new CronJob('0 * * * * *', function(){
		console.log('Loading data from weather underground');
		var weatherService = new WeatherService();
		var response = weatherService.currentJacksonWeather();
		console.log(response);
	}, null, true);
}