var SunnyPortalAPI = require('sunnyportal-api');
var configSP = require('../../config/sunnyportal.js');

var SunnyPortal = function SunnyPortal() {
	//NO_OP
};

SunnyPortal.prototype.currentProduction = function() {
	var opts = {
		url : configSP.url,
		username : configSP.username,
		password : configSP.password,
		plantOID : configSP.plantOID
	};
	console.log('Current Production');
	
	var sunnyPortalAPI = new SunnyPortalAPI(opts);
	sunnyPortalAPI.currentProduction(function(err, body) {
		console.log(body);
	});
};

module.exports = SunnyPortal;