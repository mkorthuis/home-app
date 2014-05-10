var foscam = require('foscam');
var configCam = require('../../config/foscam.js');

var Foscam = function() {

	var takeSnapshot = function() {
		console.log('taking snapshot');
		
		foscam.setup({
			host : configCam.host,
			port : configCam.port,
			user : configCam.user,
			pass : configCam.pass
		});
		
		foscam.status(function(response) {
			console.log(response);
		});

		foscam.snapshot('/Users/mkorthuis/Documents/save.jpg', function(path) {
			console.log('here. ' + path);
		});
		console.log('Snapshot Complete');
	};

	return {
		takeSnapshot : takeSnapshot
	};

};

module.exports = Foscam;

