'use strict';

var chai = require('chai');
require('sinon');
var sinonChai = require('sinon-chai');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

var should = chai.should();
mockgoose(mongoose);
chai.use(sinonChai);

describe('Token', function () {

    var Token;

    before(function () {
        var nogueiraStorage = require('../');
        mockgoose.reset();
        Token = nogueiraStorage.app.models.token;
    });

    after(function () {
    });

    describe('.token persistence', function () {
        it('saves the token', function (done) {
            var token = new Token(
                {
                    token: 'TOKEN-0007',
                    status: 0,
                }
            );
            token.save(
                function (err, data) {
                    data._id.should.not.be.null;
                    should.not.exist(err);
                    done();
                }
            );
        });

        it('saves the token - fail already exists', function (done) {
            var token = new Token(
                {
                    token: 'TOKEN-0007',
                    status: 0,
                }
            );

            token.save(
                function (err, data) {
                    err.should.not.be.null;
                    should.not.exist(data);
                    done();
                });
        });

        it('find the token status', function (done) {
            Token.find(
                {
                    token: 'TOKEN-0007',
                }
            ).exec(
                function (err, data) {
                    data[0]._id.should.not.be.null;
                    data[0].status.should.be.equals(0);
                    should.not.exist(err);
                    done();
                }
            );
        });
    });
});