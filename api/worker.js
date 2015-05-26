var connector = require('./libs/connector');
var compute = require('./handlers/compute')

// once connected, setup
connector('queue').process('vote', 10, compute);
