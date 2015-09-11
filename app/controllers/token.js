'use strict';

var CJM   = require('carbono-json-messages');
var pjson = require('../../package.json');

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
                res.status(500).json(createJsonResponse(undefined, err));

                return;
            }

            res.status(200).json(createJsonResponse(data, undefined));
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
            .exec(function (err, docs) {
                if (err) {
                    res.status(500).json(createJsonResponse(undefined, err));

                    return;
                }

                // If the token could not be found, docs will
                // be an empty array. We should treat those
                // cases accordingly.
                if (docs.length > 0) {
                    res
                        .status(200)
                        .json(createJsonResponse(docs[0], undefined));
                } else {
                    var error = {
                        code: 404,
                        message: 'Token not found'
                    };

                    res.status(404).json(createJsonResponse(undefined, error));
                }
            });
    };

    /**
     * Creates a response following Google's
     * JSON style guide (which is implemented
     * by the Carbono JSON Messages).
     *
     * @param {Object} Object with relevant data
     *                 to be put in the response.
     * @param {Object} Errors that may have occurred
     *                 along the way.
     * 
     * @returns {Object} Response object following
     *                   Google's JSON style guide.
     */
    var createJsonResponse = function (data, error) {
        var cjm = new CJM({apiVersion: pjson.version});

        if (data) {
            cjm.setData(data);
        } else {
            cjm.setError(error);
        }

        return cjm.toObject();
    };

    var tokenController = {
        saveToken: saveToken,
        getTokenStatus: getTokenStatus,
    };

    return tokenController;
};