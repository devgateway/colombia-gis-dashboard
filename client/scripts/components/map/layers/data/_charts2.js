'use strict';

var React = require('react');
var Reflux = require('reflux');
var HighCharts = require('highcharts-browserify');


var data= [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ];


module.exports  = React.createClass({
  render: function() {
    var chartInstance = new Highcharts.Chart().Pie(data);
        console.log('charts2>render');
        return ({chartInstance});
    }
});
