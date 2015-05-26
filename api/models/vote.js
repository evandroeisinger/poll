var connector = require('../libs/connector');
var Schema    = connector('mongoose').Schema;

var VoteSchema = new Schema({
  poll: String,
  candidate: String,
  date: {
    type: Date
  }
});

VoteSchema.statics.create = function(poll, candidate, date, callback) {
  new this({
    poll: poll,
    candidate: candidate,
    date: date
  }).save(callback);
};

VoteSchema.statics.queue = function(poll, candidate) {
  connector('queue').create('vote', {
    poll: poll,
    candidate: candidate,
    date: Date.now()
  }).attempts(5).removeOnComplete(true).save();
}

VoteSchema.statics.result = function(poll, candidate, callback) {
  var aggregate = this.aggregate([
    { $sort: { y: 1, m: 1, d: 1, h: 1 },},
    { $match: { poll: poll + '', candidate: candidate + '' }},
    { $project: {
        y: { $year: '$date' },
        m: { $month: '$date' },
        d: { $dayOfMonth: '$date' },
        h: { $hour: '$date' }}
    },
    { $group: {
      _id: { year: '$y', month: '$m', day: '$d', hour: '$h' },
      votes: { $sum : 1 }}
    }]);

  aggregate.options = { allowDiskUse: true };
  aggregate.exec(callback);
};

module.exports = connector('mongoose').model('Vote', VoteSchema);