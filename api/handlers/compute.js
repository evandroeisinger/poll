var Candidate = require('../models/candidate');
var Vote      = require('../models/vote');
var Poll      = require('../models/poll');

// WORKER vote
module.exports = function computeHandler(vote, done) {
  var poll      = vote.data.poll;
  var candidate = vote.data.candidate;
  var date      = vote.data.date;
  
  Poll.valid(poll, function(err, poll) {
    if (err)
      return done();

    // fetch candidate index from poll
    candidate = Candidate.fetchIndex(candidate, poll.candidates);

    if (!candidate)
      return done();

    Vote.create(poll._id, candidate._id, date, function(err) {
      if (err)
        return done();

      Poll.compute(poll._id, candidate.index, done);
    });
  });
}