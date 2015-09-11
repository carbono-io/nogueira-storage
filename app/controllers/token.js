'use strict';

module.exports = function (app) {
    var Token = app.models.token;

    var saveToken = function (req, res) {
        var token = new Token({
            token: req.body.data.token,
            status: 0,
        });

        token.save(function (err, data) {
            if (err) {
                res.json({error: err});

                return;
            }

            res.json({data: data});
        });
    };

    var tokenController = {
        saveToken: saveToken,
    };

    return tokenController;
};