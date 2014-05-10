var SunnyPortalService = require('../services/sunnyportal');

exports.currentProduction = function(req, res) {
	var sunnyPortalService = new SunnyPortalService();
	var response = sunnyPortalService.currentProduction();
};