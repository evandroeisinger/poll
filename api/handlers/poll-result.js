var Async  = require('async');
var moment = require('moment');
var Poll   = require('../models/poll');
var Vote   = require('../models/vote');

// GET api/poll/result/:poll
module.exports = function pollResultHandler(req, res, next) {
  Poll.exist(req.params.poll, function(err, poll) {
    if (err)
      return res.json(500, err);

    Async.parallel(poll.candidates.map(function(candidate) {
      return function(done) {
        Vote.result(poll._id, candidate._id, function(err, votes) {
          done(err, {
            _id: candidate._id,
            name: candidate.name,
            votes: votes,
          });
        });
      }
    }), function(err, results) {
      var votes           = poll.votes;
      var maxVotesPerHour = 0;
      var candidates      = [];
      var hours           = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

      // current or end poll date
      var current = poll.date_end ? moment(poll.date_end) : moment(new Date());
      
      // set candidates votes
      results.forEach(function(result) {
        var candidate = {
          _id: result._id,
          name: result.name,
          votes: hours.slice(0)
        };

        // fetch current day votes
        candidate.votes = candidate.votes.map(function(hour) {
          var votes = 0;

          result.votes.forEach(function(data) {
            var _date  = data._id;
            var _votes = data.votes;
            
            if (hour != _date.hour) return;
            if (current.date() != _date.day) return;
            if ((current.month() + 1) != _date.month) return;
            if (current.year() != _date.year) return;

            // update max votes
            if (maxVotesPerHour < _votes)
              maxVotesPerHour = _votes;

            // set votes per hour
            votes = _votes;
          });

          // update hour votes
          return votes;
        });

        // add candidate result
        candidates.push(candidate);
      });

      // return candidates votes per hour
      res.json(200, {
        votes: votes,
        maxVotesPerHour: maxVotesPerHour,
        candidates: candidates,
        hours: hours,
      });
    });

  });
};
