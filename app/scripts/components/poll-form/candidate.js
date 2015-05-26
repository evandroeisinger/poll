var React = require('react');

var Candidate = React.createClass({
  handleClick: function() {
    this.props.onCandidateSelect(this.props.index);
  },

  render: function() {
    var className = "poll-form__candidate";
    
    if (this.props.selected)
      className += " poll-form__candidate--selected"
    
    return (
      <a className={ className } onClick={ this.handleClick }>
        <figure className="poll-form__candidate-picture">
          <img src={ this.props.picture } />
        </figure>
        <span className="poll-form__candidate-name">{ this.props.name }</span>
      </a>
    );
  }
});

module.exports = Candidate;
