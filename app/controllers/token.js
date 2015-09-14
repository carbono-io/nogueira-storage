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
                var code = 500;

                res
                    .status(code)
                    .json(createErrorResponse(err, code, ''));

                return;
            }

            res.status(200).json(createSuccessResponse(data));
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
                    var code = 500;

                    res.status(code).json(createErrorResponse(err, code, ''));

                    return;
                }

                // If the token could not be found, docs will
                // be an empty array. We should treat those
                // cases accordingly.
                if (docs.length > 0) {
                    res
                        .status(200)
                        .json(createSuccessResponse(docs[0]));
                } else {
                    var code = 404;
                    var message = 'Token not found';

                    res
                        .status(code)
                        .json(createErrorResponse({}, code, message));
                }
            });
    };

    /**
     * Creates a success response, following Google's
     * JSON style guide.
     *
     * @param {Object} Object with relevant data
     *                 to be put in the response.
     *
     * @returns {CarbonoJsonResponse} Response object following
     *                                Google's JSON style guide.
     */
    var createSuccessResponse = function (data) {
        var cjm = new CJM({apiVersion: pjson.version});
        cjm.setData(data);

        return cjm.toObject();
    }

    /**
     * Creates an error response, following Google's
     * JSON style guide.
     *
     * @param {int} Error code
     * @param {string} Error message
     * @param {Object} Error object
     *
     * @returns {CarbonoJsonResponse} Response object following
     *                                Google's JSON style guide.
     */
    var createErrorResponse = function (err, code, message) {
        var cjm = new CJM({apiVersion: pjson.version});

        if (typeof code !== 'undefined') {
            cjm.setError(code, message, [err]);
        } else {
            cjm.setError(err);
        }

        return cjm.toObject();
    }

    var tokenController = {
        saveToken: saveToken,
        getTokenStatus: getTokenStatus,
    };

    return tokenController;
};