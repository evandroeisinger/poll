var connector = require('../../libs/connector');

module.exports = function(collection, next, mongoose) {
  connector('mongoose').connection.db.dropCollection(collection, next);
}