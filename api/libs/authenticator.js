var restify = require('restify');
var secret  = process.env.API_SECRET;

// enable auth header
restify.CORS.ALLOW_HEADERS.push('api-access-token');

function authenticate(req, res, next) {
  var token = req.headers['api-access-token'];
  
  // TODO - need to improve auth with jsonwebtoken/oauth
  if (!token || token !== secret || !secret)
    return next(new restify.ForbiddenError('invalid access token!'));

  next();
}

module.exports = authenticate;