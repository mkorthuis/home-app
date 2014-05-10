var FoscamService = require('../services/foscam');

exports.takeSnapshot = function(req, res) {
	var foscamService = new FoscamService();
	var response = foscamService.takeSnapshot();
};