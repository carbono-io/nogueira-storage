'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
        },
    });

    return mongoose.model('tokens', token);
};