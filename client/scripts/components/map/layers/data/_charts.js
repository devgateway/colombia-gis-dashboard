'use strict';

var React = require('react');
var Reflux = require('reflux');
var rd3 = require('react-d3');

module.exports  = React.createClass({
  render: function() {
    console.log('charts>render');
    var data = [];
    var PieChart = rd3.PieChart;
    if(this.props.data){
        var totalValue = 0;
        this.props.data.map(function(node, index) {
            totalValue += parseInt(node.value);
        });
        this.props.data.map(function(node, index) {
          var l = node.name + " - " +parseInt(node.value);
          data.push({label: l , value:parseInt(parseInt(node.value)/totalValue*100)});
        });
        return (<div><PieChart data={data} width={310} height={220} radius={60} innerRadius={0} /></div>);
    } else {
        return (<div>No data!</div>);
    }

  }
});