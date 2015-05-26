var React = require('react');
var Chart = require("react-chartjs").Doughnut;

var Candidate = React.createClass({
  render: function() {
    var chartData    = [];
    var chartOptions = {
      segmentShowStroke: false,
      animateRotate: false,
      showTooltips: false,
      percentageInnerCutout: 80,
    };

    chartData[0] = {
      value: this.props.result,
      color: this.props.color,
    };

    chartData[1] = {
      value: 100 - this.props.result || 0,
      color: "#323741",
    }

    return (
      <span className="poll-monitor__candidate">
        <Chart
          className="poll-monitor__candidate-chart"
          data={ chartData }
          options={ chartOptions } />
        <span className="poll-monitor__candidate-info">
          <span className="poll-monitor__candidate-name">{ this.props.name }</span>
          <span className="poll-monitor__candidate-percent">{ this.props.result }%</span>
        </span>
      </span>
    );
  }
});

module.exports = Candidate;
