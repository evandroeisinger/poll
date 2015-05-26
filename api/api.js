var restify = require('restify');
var api;

// libs
var connector     = require('./libs/connector');
var authenticator = require('./libs/authenticator');

// handlers
var voteHandler        = require('./handlers/vote');
var candidatesHandler  = require('./handlers/candidates');
var pollsEndedHandler  = require('./handlers/polls-ended');
var pollResultHandler  = require('./handlers/poll-result');
var startPollHandler   = require('./handlers/poll-start');
var endPollHandler     = require('./handlers/poll-end');
var currentPollHandler = require('./handlers/poll-current');

// create server
api = restify.createServer();

// set middlewares
api.use(restify.bodyParser());
api.use(restify.CORS());
api.use(restify.gzipResponse());

// set authentication
if (process.env.NODE_ENV === 'production')
  api.use(authenticator);

// set handlers
api.get('/api/polls/ended', pollsEndedHandler);
api.get('/api/poll/current', currentPollHandler);
api.get('/api/poll/result/:poll', pollResultHandler);
api.get('/api/candidates', candidatesHandler);
api.put('/api/poll/end/:poll', endPollHandler);
api.post('/api/vote/:poll/:candidate', voteHandler);
api.post('/api/poll', startPollHandler);

// get up
api.listen(process.env.API_PORT || 8081, function() {
  console.log('API at %s', api.url);
});
