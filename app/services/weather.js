var WunderNodeClient = require("wundernode");
var configWU = require('../../config/wunderground.js');

var Weather = function Weather() {
	//NO_OP
};

Weather.prototype.currentJacksonWeather = function() {
	var wunderClient = new WunderNodeClient(configWU.apiKey, configWU.debug,  configWU.requestLimit, configWU.requestLimitType);
	var query = 'pws:' + configWU.pwsHome;
	wunderClient.conditions(query, function(err, obj) {
		if (err){
			console.log('errors: ' + err);
			res.end("Error processing query string:" + queryData.query);
		} else {
			return obj;
		}
	});
};

module.exports = Weather;