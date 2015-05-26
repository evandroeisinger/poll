var request  = require('request');
var secret   = process.env.RECAPTCHA_SECRET;

function captchator(token, done) {
  var url;

  if (!token)
    return done(false);

  url = ['https://www.google.com/recaptcha/api/siteverify?secret=', secret, '&response=', token].join('');
  request.post(url, function(err, code, body) {
    done(JSON.parse(body).success);
  });
}

module.exports = captchator;