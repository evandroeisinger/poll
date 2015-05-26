var Poll = require('../models/poll');

// GET api/poll/current
module.exports = function currentPollsHandler(req, res, next) {
  Poll.current(function(err, poll) {
    if (err)
      return res.json(500, err);

    // no poll in progress
    if (!poll)
      return res.send(204);

    // return active poll
    res.json(200, poll);
  });
};
