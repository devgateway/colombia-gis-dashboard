'use strict';

var React = require('react');
var Reflux = require('reflux');
var InfoWindowMap = require('../../../conf/infoWindowMap.js');
var InfoWindowActions=require('../../../actions/infoWindowActions.js');
var InfoWindowStore=require('../../../stores/infoWindowStore.js');
var HighCharts = require('highcharts-browserify');



module.exports  = React.createClass({
  mixins: [Reflux.connect(InfoWindowStore)],

  componentWillMount:function(){
    console.log('popup>componentWillMount');
    var data = this._getInfoWindowData(); 
    this.setState({data: data});
  },

  _getInfoWindowData: function () {
      var data = InfoWindowActions.getInfoFromAPI(InfoWindowMap.getInfoWindowData()) || [];
      return data;
  },

  componentDidMount: function() {
    console.log('chart1>componentDidMount');
    this._renderChart();
  },
  componentDidUpdate: function() {
    console.log('chart1>componentDidUpdate');
    this._renderChart();
  },

  _renderChart: function() {
    console.log('chart1>_renderChart');
    var params = this.props.path.slice(this.props.path.indexOf('?') + 1).split('&');
    var vars = [];
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        vars[param[0]] = param[1];
    }

    var infoData = [];
    var titleArray = [];
    if(this.state.infoWindow){
      this.state.infoWindow.map(function(node, index) {
        titleArray.push(node.title)
        node.value.map(function(innerNode, index) {
          if(innerNode.id==vars["id"]){
            infoData.push(innerNode.value);
          } else {
            infoData.push();
          }
        });
      });
    } 
    if(infoData.length>0 && infoData[vars["tab"]].length>0){
        var chartdata = [];
        var totalValue = 0;
        infoData[vars["tab"]].map(function(node, index) {
            totalValue += parseInt(node.value);
        });
        infoData[vars["tab"]].map(function(node, index) {
          var chartnode = [];
          chartnode.push(node.name);
          chartnode.push(parseInt(parseInt(node.value)/totalValue*100));
          chartdata.push(chartnode);
        });

        var chart = new HighCharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'pie'
            },
            title: {
                text: titleArray[vars["tab"]]
            },
            plotOptions: {
                pie: {
                    borderColor: '#000000',
                    innerSize: '0.1%',
                    animation: false 
                }
            },
            series: [{data: chartdata}]
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
    }
  },


  render: function() {
      console.log('chart1>render');
      return (<div className="chart-container" id="container" ></div>);
    }
});