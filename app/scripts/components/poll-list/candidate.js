var React = require('react');

var Candidate = React.createClass({
  render: function() {
    var candidateClassName = 'poll-list__candidate';

    if (this.props.eliminated)
      candidateClassName += ' poll-list__candidate--eliminated';

    return (
      <span className={candidateClassName}>
        <figure className="poll-list__candidate-picture">
          <img src={ this.props.picture } />
        </figure>
        <span className="poll-list__candidate-name">{ this.props.name }</span>
        <span className="poll-list__candidate-result">{ this.props.result }%</span>
      </span>
    );
  }
});

module.exports = Candidate;