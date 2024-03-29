'use strict';

var express = require('express'),
path = require('path'),
fs = require('fs'),
mongoose = require('mongoose'),
cluster = require('cluster');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');
var db = mongoose.connect(config.mongo.uri, config.mongo.options);
//mongoose.set('debug',function (coll, method, query, doc){

//});

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
	if (/(.*)\.(js$|coffee$)/.test(file)) {
		require(modelsPath + '/' + file);
	}
});

// Passport Configuration
var passport = require('./lib/config/passport');

// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);

app.use(function(req,res,next){
	var reqDomain =  domain.create();
	reqDomain.add(req);
	reqDomain.add(res);
	reqDomain.on('error',next);
	reqDomain.run(next);
});

// Start server
app.listen(config.port, config.ip, function () {
	console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;