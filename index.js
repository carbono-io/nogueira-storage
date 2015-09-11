'use strict';

var express    = require('express');
var consign    = require('consign');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

global.db = mongoose.createConnection('mongodb://localhost:27017/nogueira');

global.db.once('open', function () {
    var app = express();

    var PORT = 13956;

    // Json parser for post data
    app.use(bodyParser.json());

    consign({cwd: 'app'})
        .include('models')
        .include('controllers')
        .include('routes')
        .into(app);

    var server = app.listen(PORT, function () {
        console.log('Nogueira Storage listening at http://%s:%s',
            server.address().address, server.address().port);
    });
});