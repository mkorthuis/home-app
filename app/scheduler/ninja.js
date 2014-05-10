
var CronJob = require('cron').CronJob;
var NinjaService = require('../services/ninja');

var lastRFTimeStamp;

exports.scheduleTemperature = function() {
	console.log('Schedule Temperature');
	new CronJob('0 * * * * *', function(){
		console.log('Loading data from ninja blocks');
		var ninjaService = new NinjaService();
		var response = ninjaService.currentTemperature();
	}, null, true);
};

exports.captureDoorBellData = function() {
	console.log('Schedule Door Bell Data Check');
	lastRFTimeStamp = Date.now();
	new CronJob('0 * * * * *', function(){
		console.log('Checking for Door Bell Data');
		var ninjaService = new NinjaService();
		var newRFTimeStamp = Date.now();
		var response = ninjaService.captureDoorBellData(lastRFTimeStamp, newRFTimeStamp);
		lastRFTimeStamp = newRFTimeStamp;
	}, null, true);
};