var connector = require('../libs/connector');
var Schema    = connector('mongoose').Schema;

var CandidateSchema = new Schema({
  name: String,
  picture: String,
});

CandidateSchema.statics.all = function(callback) {
  this.find(callback);
};

CandidateSchema.statics.fetch = function(candidates, callback) {
  this.find({
    '_id': {
      $in: candidates
    }
  }, callback);
};

CandidateSchema.statics.fetchIndex = function(id, candidates) {
  for (var i = candidates.length - 1; i >= 0; i--) {
    if (candidates[i]._id == id) {
      candidates[i].index = i;
      return candidates[i];
    }
  }

  return false;
};

module.exports = connector('mongoose').model('Candidate', CandidateSchema);
