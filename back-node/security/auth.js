const {Response} = require('express')

module.exports.isAuthorized  = function(req, res = Response, next) {

    /*var err = new Error('Not authorized! Go back!');
    err.status = 401;
    res.status = 401;*/
    return next();
}