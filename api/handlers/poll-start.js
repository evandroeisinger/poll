var Poll      = require('../models/poll');
var Candidate = require('../models/candidate');

// POST api/poll
module.exports = function startPollsHandler(req, res, next) {
  Candidate.fetch(req.body.candidates, function(err, candidates) {
    if (err)
      return res.json(500, err);

    // checks candidates length
    if (candidates.length < 2 || candidates.length > 3)
      return res.json(422, { message: 'insufficient candidates!' });

    Poll.start(candidates, function(err, poll) {
      if (err)
        return res.json(500, err);

      // return saved poll
      res.json(201, poll);
    });
  });
};
