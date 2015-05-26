var redis     = require('redis').createClient();

// libs
var connector = require('../../libs/connector');
var seed       = require('./seed');
var drop       = require('./drop');
var flushqueue = require('./flushqueue');

module.exports = function(tasks, callback) {
  var lengh   = tasks.length;
  var current = 0;
  var task;

  if (!lengh)
    return;

  function next() {
    task = tasks[current];
    current++;

    if (!task)
      connector('mongoose').connection.close(function() {
        redis.end();
        process.exit(0);
      });
    else
      console.log(task.action, (task.collection || task.data || true));

    switch(task.action) {
      case 'flushqueue':
        flushqueue(next, redis);
        break;
      case 'drop':
        drop(task.collection, next, connector('mongoose'));
        break;
      case 'seed':
        seed(task.model, task.data, next);
        break;
    }
  }

  connector('mongoose').connection.once('connected', next);
}
