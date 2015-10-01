'use strict';

var CJM = require('carbono-json-messages');
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
            token: req.body.data.id,
            status: 0,
        });

        token.save(function (err, data) {
            if (err) {
                var code = 400;
                var message = 'Token could not be saved';

                res
                    .status(code)
                    .json(createErrorResponse(err, code, message));

                return;
            }

            var msg = {
                id: data.token,
                items: [
                    {
                        status: data.status,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                    },
                ],
            };

            res.status(201).json(createSuccessResponse(msg));
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
                var code = 200;

                if (err) {
                    code = 400;

                    res.status(code).json(createErrorResponse(err, code, ''));
                } else if (docs.length > 0) {
                    var data = {
                        id: docs[0].token,
                        items: [
                            {
                                status: docs[0].status,
                                createdAt: docs[0].createdAt,
                                updatedAt: docs[0].updatedAt,
                            },
                        ],
                    };

                    res.status(code).json(createSuccessResponse(data));
                } else {
                    code = 404;
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
    };

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
    };

    var tokenController = {
        saveToken: saveToken,
        getTokenStatus: getTokenStatus,
    };

    return tokenController;
};