
var express = require('express'); 	
var mongoose = require('mongoose');
var passport = require('passport');

var app = express();
var port = process.env.PORT || 3000; 	

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

require('./app/passport')(passport); 
require('./app/main')(app, express, passport);

require('./app/routes/index.js')(app, passport);
require('./app/scheduler/index.js')();

app.listen(port);
console.log('Magic happens on port ' + port);