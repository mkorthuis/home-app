
var WeatherService = require('../services/weather');

exports.currentJacksonWeather = function(req, res) {
	var weatherService = new WeatherService();
	var response = weatherService.currentJacksonWeather();
};