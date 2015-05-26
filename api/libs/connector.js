var mongoose = require('mongoose');
var kue      = require('kue');
var queue;

function connector(name) {
  switch(name) {
    case 'mongoose':
      return mongoose;
      break;
    case 'queue':
      return queue;
      break;
  }
}

// connect to queue
queue = kue.createQueue();

// connect to mongo
mongoose.connect('mongodb://' + (process.env.DB_URL || '127.0.0.1/pollsdb'));

// disconnect all connectors
process.on('SIGINT', function() {
  queue.shutdown();
  mongoose.connection.close();
  process.exit(0);
});

module.exports = connector;
