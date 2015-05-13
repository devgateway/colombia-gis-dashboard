'use strict';

var React = require('react');
var Reflux = require('reflux');
var rd3 = require('react-d3');

module.exports  = React.createClass({
  render: function() {
    console.log('charts>render type:' + this.props.type);
    var pieData = [];
    var Treemap = rd3.Treemap;
    var PieChart = rd3.PieChart;
    if(this.props.infoWindow){
        this.props.infoWindow.map(function(node, index) {
          var l = node.name + " - " +parseInt(node.value);
          pieData.push({label: l , value:parseInt(node.value)});
        });
        if(this.props.type=="pie"){
          console.log('charts>render draw a pie');
          return <PieChart data={pieData} width={210} height={210} radius={100} innerRadius={0} textColor="#484848" fontSize="10px" />
        } else {
          console.log('charts>render draw a treemap');
          return <Treemap data={pieData} width={310} height={200} radius={80} innerRadius={0} textColor="#484848" fontSize="10px" />
        }

    } else {
      return null;
    }

  }
});