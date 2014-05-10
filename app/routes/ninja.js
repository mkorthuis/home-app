
var NinjaService = require('../services/ninja');

exports.currentTemperature = function(req, res) {
	var ninjaService = new NinjaService();
	var response = ninjaService.currentTemperature();
};

exports.currentHumidity = function(req, res) {
	var ninjaService = new NinjaService();
	var response = ninjaService.currentHumidity();
};

exports.turnPelletStoveOn = function(req, res) {
	var ninjaService = new NinjaService();
	var response = ninjaService.turnPelletStoveOn();
	
};

exports.turnPelletStoveOff = function(req, res) {
	var ninjaService = new NinjaService();
	var response = ninjaService.turnPelletStoveOff();
	
};