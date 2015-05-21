'use strict';

var React = require('react');
var Reflux = require('reflux');
var Chart = require("react-chartjs");

var chartData = [
          {
              value: 50,
              color:"#F7464A",
              highlight: "#FF5A5E",
              label: "Red"
          },
          {
              value: 12,
              color: "#46BFBD",
              highlight: "#5AD3D1",
              label: "Green"
          },
          {
              value: 13,
              color: "#FDB45C",
              highlight: "#FFC870",
              label: "Yellow"
          },
          {
              value: 15,
              color: "#949FB1",
              highlight: "#A8B3C5",
              label: "Grey"
          },
          {
              value: 10,
              color: "#4D5360",
              highlight: "#616774",
              label: "Dark Grey"
          }
          ];

var MyComponent = React.createClass({
  render: function() {
    return <Chart.Pie data={chartData} />
  }
});

module.exports  = React.createClass({
  render: function() {
    console.log('charts2>render');
        return (<div id="canvas-holder"><MyComponent /></div>);
    }
});