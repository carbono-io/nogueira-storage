'use strict';
/**
 * Foo a function.
 * @param {string} foo - description.
 */
var ffoo = function foo(pFoo) {
    console.log(pFoo);
    var ret = 'baz';
    if (pFoo === 'foo') {
        ret = 'bar';
    }
    return ret;
};

module.exports = ffoo;
