var React  = require('react');
var moment = require('moment');

// modules
var Candidate = require('./candidate');

var Poll = React.createClass({
  render: function() {
    var votes      = this.props.votes;
    var date       = moment(this.props.date).format('D/M/YY');
    var maxResult  = 0;
    var candidates = this.props.candidates.map(function(candidate, index, candidates) {
      var result = Math.round((candidate.votes * 100) / votes) || 0;

      if (result > maxResult)
        maxResult = result;

      return {
        id: candidate._id,
        name: candidate.name,
        picture: '/build/images/' + candidate.picture,
        result: result,
      }
    });

    candidates.forEach(function(candidate, index) {
      if (candidate.result === maxResult)
        candidates[index].eliminated = true;
    });

    return (
      <li className="poll-list__poll">
        <h1 className="poll-list__poll-title">
          <span className="poll-list__poll-label">Poll</span>
          <span className="poll-list__poll-date">{ date }</span>
        </h1>
        <h3 className="poll-list__poll-votes">{ votes } votes</h3>
        <div className="poll-list__poll-candidates">
          {
            candidates.map(function(candidate) {
              return (
                <Candidate
                  key={ candidate.id }
                  name={ candidate.name }
                  result={ candidate.result }
                  picture={ candidate.picture }
                  eliminated={ candidate.eliminated } />
              );
            })
          }
        </div>
      </li>
    );
  }
});

module.exports = Poll;