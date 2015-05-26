var Candidate = require('../models/candidate');

// GET api/candidates
module.exports = function candidatesHandler(req, res, next) {
  Candidate.all(function(err, candidates) {
    if (err)
      return res.json(500, err);

    // return all candidates
    res.json(200, candidates); 
  });
};
