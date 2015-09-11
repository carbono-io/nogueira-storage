'use strict';

var Schema = require('mongoose').Schema;

module.exports = function () {
    var token = new Schema({
        token: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: Number,
            required: true,
        },
    });

    return global.db.model('tokens', token);
};