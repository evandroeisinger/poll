var Vote       = require('../models/vote');
var captchator = require('../libs/captchator');

// POST api/vote/:poll/:candidate
module.exports = function voteHandler(req, res, next) {
  if (process.env.NODE_ENV === 'production')
    return captchator(req.body.token, function(authorized) {
      if (!authorized)
        return res.send(401);
      
      Vote.queue(req.params.poll, req.params.candidate);
      // vote queued
      res.send(201);
    });

  Vote.queue(req.params.poll, req.params.candidate);
  // vote queued
  res.send(201);
};
