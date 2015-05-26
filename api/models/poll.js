var connector = require('../libs/connector');
var Schema    = connector('mongoose').Schema;

var PollSchema = new Schema({
  votes: {
    type: Number,
    default: 0
  },
  date_start: {
    type: Date,
    default: Date.now
  },
  date_end: {
    type: Date
  },
  candidates: [{
    _id: String,
    name: String,
    picture: String,
    votes: {
      type: Number,
      default: 0
    },
  }],
});

PollSchema.statics.all = function(callback) {
  this.find(callback);
};

PollSchema.statics.exist = function(poll, callback) {
  this.findById(poll).exec(callback);
};

PollSchema.statics.valid = function(poll, callback) {
  this.findOne({
    _id: poll,
    date_end: null,
  }).exec(callback);
}

PollSchema.statics.ended = function(callback) {
  this.find({
    date_end: {'$ne': null}
  }).sort({
    date_start: -1
  }).exec(callback);
};

PollSchema.statics.current = function(callback) {
  this.findOne({
    date_end: null,
  }).sort({
    date_start: 1
  }).exec(callback);
};

PollSchema.statics.start = function(candidates, callback) {
  new this({
    candidates: candidates,
  }).save(callback);
};

PollSchema.statics.end = function(poll, callback) {
  this.findByIdAndUpdate(poll, {
    date_end: Date.now(),
  }, {
    'new': true
  }).exec(callback);
};

PollSchema.statics.compute = function(poll, candidate, callback) {
  var query = new Object();
  // set atomic $inc query
  query['$inc'] = {};
  query['$inc']['votes'] = 1;
  query['$inc']['candidates.' + candidate + '.votes'] = 1;
  // compute poll
  this.findByIdAndUpdate(poll, query).exec(callback);
};

module.exports = connector('mongoose').model('Poll', PollSchema);