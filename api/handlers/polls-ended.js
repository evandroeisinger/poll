var Poll = require('../models/poll');

// GET api/polls/ended
module.exports = function pollsHandler(req, res, next) {
  Poll.ended(function(err, polls) {
    if (err)
      return res.json(500, err);

    // return all ended polls
    res.json(200, polls);
  });
};
