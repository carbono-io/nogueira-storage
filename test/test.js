'use strict';
// Test with Mocha + Chai + Should
// Mocha with BDD approach
require('chai').should();
var foo = require('../lib/foomod/foomod.js');

describe('Testator', function () {
    before(function () {

    });

    after(function () {

    });

    describe('foo', function () {
        it('using foo bar', function () {
            var s = foo('foo');
            s.should.be.a('string');
            s.should.equal('bar');
            s.should.have.length(3);
        });

        it('using foo baz', function () {
            var truth = true;
            var s = foo('bar');
            s.should.be.a('string');
            truth.should.not.be.false;
            s.should.equal('baz');
            s.should.have.length(3);
        });
    });
});
