var React = require('react');
var api   = require('./api');

// components
var PollMonitor = require('./components/poll-monitor');
var PollForm    = require('./components/poll-form');
var PollList    = require('./components/poll-list');

// wrappers
var pollManagerWrapper = document.getElementById('poll-manager');
var pollListWrapper    = document.getElementById('poll-list');

// load monitor data
api('/poll/current').get(function(data, status) {
  if (status == 200)
    React.render(
      <PollMonitor
        poll={ JSON.parse(data) } />
    , pollManagerWrapper);
  else
    React.render(
      <PollForm />
    , pollManagerWrapper);
});

// load ended polls data
api('/polls/ended').get(function(data) {
  React.render(
    <PollList
      polls={ JSON.parse(data) } />
  , pollListWrapper);
});