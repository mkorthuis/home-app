

var request = require('request');
var ninjaBlocks = require('ninja-blocks');
var configNinja = require('../../config/ninja.js');

var Ninja = function() {


	var _actuateDevice =function (deviceId) {
		var ninja = ninjaBlocks.app({user_access_token : configNinja.userAccessToken});
		ninja.device(configNinja.rfGUID).fetch(function(err, device) {
			ninja.device(configNinja.rfGUID).actuate(device.subDevices[deviceId].data);	
			console.log(device);
		});
	};

	var _captureSensorData = function (deviceId, deviceName, startTime, endTime, interval) {
		var qs = {
			user_access_token : configNinja.userAccessToken,
			interval : interval,
			from : startTime, 
			to : endTime
		};

		var opts = {
			url : configNinja.uri + 'device/' + configNinja.rfGUID + '/subdevice/' + deviceId + '/data',
			method : 'GET',
			qs : qs,
			json : true
		};

		request(opts,function(e,r,b) {
			if (e) {
				console.log('Could not get ' + deviceName + ' data: ' + e);
			}
			else if (b.result == 1) { 
				console.log('Valid Response : ' + b.data);
				b.data.forEach(function(entry) {
					console.log(entry);
				});
			} else {
				console.log ('Not sure wtf happened' + b.id + " Error: " + b.error);
			}
			console.log(startTime + " " + endTime + " " + e + " " + r + " " + b.data);
		});
	};

	var currentTemperature = function () {
		var ninja = ninjaBlocks.app({user_access_token : configNinja.userAccessToken});
		ninja.device(configNinja.temperatureGUID).last_heartbeat(function(err, data) { 
			var date = new Date(data.timestamp);
			console.log('Temperature is '+data.DA+'C at ' + date);
	    });
	};

	var currentHumidity = function () {
		var ninja = ninjaBlocks.app({user_access_token : configNinja.userAccessToken});
		ninja.device(configNinja.humidityGUID).last_heartbeat(function(err, data) { 
			var date = new Date(data.timestamp);
			console.log('Humidity is '+data.DA+'% at ' + date);
	    });
	};

	var turnPelletStoveOn = function () {
		_actuateDevice(configNinja.pelletStoveOnId);
	};

	var turnPelletStoveOff = function () {
		_actuateDevice(configNinja.pelletStoveOffId);
	};

	var turnHumidifierOn = function() {
		_actuateDevice(configNinja.humidifierOn);
	};

	var turnHumidifierOff = function() {
		_actuateDevice(configNinja.humidiferOff);
	};

	var turnCameraOn = function() {
		_actuateDevice(configNinja.cameraOn);
	};

	var turnCameraOff = function() {
		_actuateDevice(configNinja.cameraOff);
	};

	var captureDoorBellData = function(startTime, endTime) {
		_captureSensorData(configNinja.doorBellId, 'door bell', startTime, endTime, '1min');
	};

	var captureDoorBreakData = function(startTime, endTime) {
		_captureSensorData(configNinja.doorBreakId, 'door break', startTime, endTime, '1min');
	};

	var captureInfraredData = function(startTime, endTime) {
		_captureSensorData(configNinja.infraredSensorId, 'infrared sensor', startTime, endTime, '1min');
	};

	return {
		currentTemperature : currentTemperature,
		currentHumidity : currentHumidity,
		turnPelletStoveOn : turnPelletStoveOn,
		turnPelletStoveOff : turnPelletStoveOff,
		turnHumidifierOn : turnHumidifierOn,
		turnHumidifierOff : turnHumidifierOff,
		turnCameraOn : turnCameraOn,
		turnCameraOff : turnCameraOff,
		captureDoorBellData : captureDoorBellData,
		captureDoorBreakData : captureDoorBreakData,
		captureInfraredData : captureInfraredData
	};
}

module.exports = Ninja;

