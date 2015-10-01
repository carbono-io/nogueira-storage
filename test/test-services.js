'use strict';

var chai = require('chai');
require('sinon');
var sinonChai = require('sinon-chai');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var config = require('config');

chai.should();
mockgoose(mongoose);
chai.use(sinonChai);

describe('Token', function () {

    var nogueiraStorage;
    var port;
    before(function () {
        port = config.get('port');
        nogueiraStorage = require('../');
        mockgoose.reset();
    });

    after(function () {
        nogueiraStorage.server.close();
    });

    function requestSaveToken(data, callback) {
        var request = require('request');
        var CJM = require('carbono-json-messages');
        var cjm = new CJM({id: 'x1', apiVersion: '1.0.0'});

        cjm.setData(data);

        var url = 'http://localhost:' + port +
            '/nog/tokens';

        var load = {
            url: url,
            json: cjm.toObject(),
        };

        var _cb = function (err, httpResponse) {
            callback(httpResponse);
        };
        request.post(load, _cb);
    }

    function requestGetStatus(token, callback) {

        var request = require('request');

        var url = 'http://localhost:' + port +
            '/nog/tokens/' + token;

        var load = {url: url};

        var _cb = function (err, httpResponse) {
            callback(httpResponse);
        };
        request.get(load, _cb);
    }

    describe('.save', function () {
        it('saves the token', function (done) {
            var data = {
                id: 'TOKEN-0007',
                items: [
                    {
                        status: 0,
                    },
                ],
            };

            requestSaveToken(data, function (httpResponse) {
                httpResponse.statusCode.should.be.equals(201);

                var obj = httpResponse.body;
                obj.apiVersion.should.be.equals('0.0.1');
                obj.data.id.should.be.equals('TOKEN-0007');

                done();
            });
        });

        it('saves the token again - fail', function (done) {
            var data = {
                id: 'TOKEN-0007',
                items: [
                    {
                        status: 0,
                    },
                ],
            };

            requestSaveToken(data, function (httpResponse) {
                httpResponse.statusCode.should.be.equals(400);
                var obj = httpResponse.body;
                obj.apiVersion.should.be.equals('0.0.1');
                obj.error.should.not.be.null;

                done();
            });
        });

        it('Get Token Status - success', function (done) {
            requestGetStatus('TOKEN-0007', function (httpResponse) {
                httpResponse.statusCode.should.be.equals(200);
                var obj = JSON.parse(httpResponse.body);
                obj.apiVersion.should.be.equals('0.0.1');
                obj.data.items[0].status.should.be.equals(0);

                done();
            });
        });

        it('Get Token Status - fail', function (done) {
            requestGetStatus('TOKEN-0666', function (httpResponse) {
                httpResponse.statusCode.should.be.equals(404);
                var obj = JSON.parse(httpResponse.body);
                obj.apiVersion.should.be.equals('0.0.1');
                obj.error.should.not.be.null;
                done();
            });
        });

        it('Get Token Status - fail', function (done) {
            requestGetStatus('%20', function (httpResponse) {
                httpResponse.statusCode.should.be.equals(404);
                var obj = JSON.parse(httpResponse.body);
                obj.apiVersion.should.be.equals('0.0.1');
                obj.error.should.not.be.null;
                done();
            });
        });
    });
});
