'use strict';

module.exports = function (app) {
    var Token = app.models.token;

    /**
     * Saves the given token in the database.
     *
     * @function
     *
     * @param {Object} Request object
     * @param {Object} Response object
     */
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

    /**
     * Retrieves from the database the document
     * of the given token.
     *
     * @function
     *
     * @param {Object} Request object
     * @param {Object} Response object
     */
    var getTokenStatus = function (req, res) {
        Token
            .find({token: req.params.token})
            .exec(function (err, doc) {
                if (err) {
                    res.status(500).json(err);
                }

                // Use carbono json messages to assemble response

                console.log(doc);
            });
    };

    var tokenController = {
        saveToken: saveToken,
        getTokenStatus: getTokenStatus,
    };

    return tokenController;
};