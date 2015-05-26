var React = require('react');
var Chart = require("react-chartjs").Line;

var Graphic = React.createClass({
  _findFirstIndex: function(datasets) {
    var firstIndex = null;

    datasets.forEach(function(candidate) {
      var length = candidate.data.length;
      for (var index = 0; index < length; index++) {
        if (candidate.data[index + 1] > 0 || candidate.data[index] > 0)
          if (firstIndex === null || index < firstIndex)
            return firstIndex = index;
      }
    });

    return firstIndex;
  },

  _findLastIndex: function(datasets) {
    var lastIndex = null;

    datasets.forEach(function(candidate) {
      for (var index = candidate.data.length - 1; index > 0; index--) {
        if (candidate.data[index - 2] > 0 || candidate.data[index] > 0)
          if (lastIndex === null || lastIndex < index)
            return lastIndex = index;
      }
    });

    return lastIndex;
  },

  _trimData: function(data, firstIndex, lastIndex) {
    if (!firstIndex && lastIndex === (data.length - 1))
      return data;
    if (lastIndex === (data.length - 1))
      lastIndex++;

    return data.slice(firstIndex, lastIndex);
  },

  _parseData: function() {
    var firstIndex = 0;
    var lastIndex  = 0;
    var data       = {
      stepWidth: this.props.data.maxVotesPerHour / 2,

      labels: this.props.data.hours.map(function(hour) {
        return hour + ' h';
      }),

      datasets: this.props.data.candidates.map(function(candidate) {
        return {
          strokeColor: candidate.color,
          pointColor: candidate.color,
          data: candidate.votes,
        };
      }),
    };

    firstIndex    = this._findFirstIndex(data.datasets);
    lastIndex     = this._findLastIndex(data.datasets);

    data.labels   = this._trimData(data.labels, firstIndex, lastIndex);
    data.datasets = data.datasets.map(function(candidate) {
      candidate.data = this._trimData(candidate.data, firstIndex, lastIndex);
      return candidate;
    }.bind(this));

    return data;
  },

  render: function() {
    if (!this.props.data)
      return false;

    var data    = this._parseData();
    var options = {
      scaleOverride: true,
      showScale: true,
      scaleStepWidth: data.stepWidth,
      scaleSteps: 2,
      responsive: true,
      datasetFill : false,
      datasetStrokeWidth : 4,
      showTooltips: false
    };

    return (
      <Chart
        className="poll-monitor__chart"
        data={ data }
        options={ options } />
    );
  }
});

module.exports = Graphic;
