var React = require('react');

// modules
var Poll = require('./poll');

var PollList = React.createClass({
  render: function() {
    var polls = this.props.polls.map(function(poll) {
      return (
        <Poll
          key={poll._id}
          date={poll.date_start}
          candidates={poll.candidates}
          votes={ poll.votes } />
      );
    });

    if (!polls.length)
      polls = (
        <li className="poll-list__poll">
          <h1 className="poll-list__empty">No polls ended</h1>
        </li>
      );

    return (
      <ul className="poll-list">{ polls }</ul>
    );
  }
});

module.exports = PollList;