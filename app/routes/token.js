'use strict';

var TOKEN_STATUS_PATH = '/tokens/:token';
var TOKEN_PATH        = '/tokens';

module.exports = function (app) {
    var tokenController = app.controllers.token;

    app.post(TOKEN_PATH, tokenController.saveToken);
    app.get(TOKEN_STATUS_PATH, tokenController.getTokenStatus);
};