'use strict';

var React = require('react');
var Reflux = require('reflux');
var HighCharts = require('highcharts-browserify');



module.exports  = React.createClass({
  componentDidMount: function() {
    console.log('charts3>componentDidUpdate');
    this._renderChart();
  },

  _renderChart: function() {
    console.log('charts3>_renderChart');
    var chartdata = [];
    var chartdata2 = [
                ['OECD',   45.0],
                ['IATI',       26.8],
                ['USAID',    8.5],
                ['Others',   22.7]
            ];
    debugger;
    if(this.props.data){
        var totalValue = 0;
        this.props.data.map(function(node, index) {
            totalValue += parseInt(node.value);
        });
        this.props.data.map(function(node, index) {
          var chartnode = [];
          chartnode.push(node.name);
          chartnode.push(parseInt(parseInt(node.value)/totalValue*100));
          chartdata.push(chartnode);
        });
    }

    var chart = new HighCharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'pie'
        },
        title: {
            text: ''
        },
        plotOptions: {
            pie: {
                borderColor: '#000000',
                innerSize: '0.1%',
                animation: false 
            }
        },
        series: [{data: chartdata2}]
    },
    // using 
                                     
    function(chart) { // on complete
        
        var xpos = '50%';
        var ypos = '53%';
        var circleradius = 0;
    
    // Render the circle
    chart.renderer.circle(xpos, ypos, circleradius).attr({
        fill: '#ddd',
    }).add();

    
    });
  },

  componentWillUpdate: function() {
    console.log('charts3>componentWillUpdate');
    this._renderChart();
  },

  render: function() {
      console.log('charts3>render');
      return (<div className="chart-container" id="container" ></div>);
    }
});