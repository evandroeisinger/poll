var React  = require('react');
var api    = require('../../api');

// modules
var Chart     = require('./graphic');
var Candidate = require('./candidate');

var PollMonitor = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      saving: false,
      data: false,
    };
  },

  componentDidMount: function() {
    api('/poll/result/' + this.props.poll._id).get(this._fetchData);
  },

  handlePollCompletion: function() {
    this.setState({
      saving: true,
    });

    api('/poll/end/' + this.props.poll._id).put(this._reload);
  },

  _fetchData: function(data) {
    this.setState({
      loaded: true,
      data: JSON.parse(data),
    });
  },

  _parseCandidates: function() {
    var colors = ['#2AEAFF', '#FF2A51', '#FF9500'];
    var votes  = this.props.poll.votes;

    return this.props.poll.candidates.map(function(candidate, index, candidates) {
      var result = Math.round((candidate.votes * 100) / votes) || 0;

      return {
        id: candidate._id,
        name: candidate.name,
        result: result,
        color: colors[index]
      }
    });
  },

  _reload: function() {
    document.location.reload();
  },

  render: function() {
    var data             = this.state.data;
    var candidates       = this._parseCandidates();
    var graphicClassName = "poll-monitor__graphic";

    if (!this.state.loaded)
      graphicClassName += " poll-monitor__graphic--loading";
    else
      data.candidates = data.candidates.map(function(candidate, index) {
        candidate.color = candidates.filter(function(_candidate) {
          return candidate._id == _candidate.id;
        })[0].color;

        return candidate;
      });

    return (
      <div className="poll-monitor">
        <div className={ graphicClassName }>
          <Chart data={ data } />
        </div>
        <h1 className="poll-monitor__votes">
          <span className="poll-monitor__votes-label">total votes</span>
          <span className="poll-monitor__votes-count">{ this.props.poll.votes }</span>
        </h1>
        <div className="poll-monitor__candidates">
          {
            candidates.map(function(candidate) {
              return (
                <Candidate
                  key={ candidate.id }
                  name={ candidate.name }
                  result={ candidate.result }
                  color={ candidate.color } />
              );
            })
          }
        </div>
        <div className="poll-monitor__actions">
          <button
            disabled={ this.state.saving }
            className="poll-monitor__end-button"
            onClick={ this.handlePollCompletion }>End poll</button>
        </div>
      </div>
    );
  }
});

module.exports = PollMonitor;
