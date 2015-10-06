'use strict';

var express    = require('express');
var consign    = require('consign');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config   = require('config');
var app = null;
var server = null;

var mongourl = config.get('mongourl');
global.db = mongoose.createConnection(mongourl);

global.db.once('open', function () {

});

var app = express();
var port = config.get('port');

// Json parser for post data
app.use(bodyParser.json());

consign({cwd: process.cwd() + '/app'})
    .include('models')
    .include('controllers')
    .include('routes')
    .into(app);

var server = app.listen(port, function () {
    console.log('Nogueira Storage listening at http://%s:%s',
        server.address().address, server.address().port);
    require('carbono-service-manager');
});

module.exports.app = app;
module.exports.server = server;