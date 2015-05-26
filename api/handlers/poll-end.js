var Poll = require('../models/poll');

// PUT api/poll/end/:poll
module.exports = function endPollsHandler(req, res, next) {
  Poll.end(req.params.poll, function(err, poll) {
    if (err)
        return res.json(500, err);

    // return finished poll
    res.json(200, poll);
  });
};
