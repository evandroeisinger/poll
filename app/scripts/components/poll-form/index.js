var React = require('react');
var api   = require('../../api');

// modules
var Candidate = require('./candidate');

var PollForm = React.createClass({
  getInitialState: function() {
    return {
      invalid: true,
      loaded: false,
      starting: false,
      candidates: [],
      selected: [],
    };
  },

  componentDidMount: function() {
    api('/candidates').get(this._fetchCandidates);
  },

  handleCandidateSelection: function(index) {
    var candidate = this.state.candidates[index];

    if (!candidate.selected)
      this._selectCandidate(candidate)._validate();
    else
      this._unSelectCandidate(candidate)._validate();

    this.forceUpdate();
  },

  handlePollCreation: function() {
    api('/poll').post({
      candidates: this.state.selected.map(function(candidate) {
        return candidate.id;
      })
    }, this._reload);

    this.setState({
      starting: true,
    });
  },

  _fetchCandidates: function(candidates) {
    candidates = JSON.parse(candidates);

    this.setState({
      loaded: true,
      candidates: candidates.map(function(candidate, index) {
        return {
          id: candidate._id,
          name: candidate.name,
          picture: '/build/images/' + candidate.picture,
          selected: false,
          index: index
        };
      })
    });
  },

  _selectCandidate: function(candidate) {
    candidate.selected = true;
    this.state.selected.push(candidate);

    return this;
  },

  _unSelectCandidate: function(candidate) {
    candidate.selected = false;
    this.state.selected = this.state.selected.filter(function(_candidate) {
      return candidate.id !== _candidate.id;
    });

    return this;
  },

  _validate: function() {
    if (this.state.selected.length > 3)
      this._unSelectCandidate(this.state.candidates[this.state.selected[0].index]);

    if (this.state.selected.length > 1)
      this.state.invalid = false;
    else
      this.state.invalid = true;
  },

  _reload: function() {
    document.location.reload();
  },

  render: function() {
    var candidatesClassName  = "poll-form__candidates";
    var startButtonClassName = "poll-form__start-button";

    if (!this.state.loaded)
      candidatesClassName += " poll-form__candidates--loading";
    if (this.state.starting)
      startButtonClassName += " poll-form__start-button--starting";

    return (
      <div className="poll-form">
        <h1 className="poll-form__title">Select candidates</h1>
        <div className={ candidatesClassName }>
          {
            this.state.candidates.map(function(candidate) {
              return (
                <Candidate
                  key={ candidate.id }
                  name={ candidate.name }
                  picture={ candidate.picture }
                  index={ candidate.index }
                  selected={ candidate.selected }
                  onCandidateSelect={ this.handleCandidateSelection } />
              );
            }.bind(this))
          }
        </div>
        <div className="poll-form__actions">
          <button
            disabled={ this.state.invalid || this.state.starting }
            className={ startButtonClassName }
            onClick={ this.handlePollCreation }>Start poll</button>
        </div>
      </div>
    );
  }
});

module.exports = PollForm;