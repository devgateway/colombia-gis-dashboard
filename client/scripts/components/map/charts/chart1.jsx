'use strict';

var React = require('react');
var Reflux = require('reflux');
var InfoWindowMap = require('../../../conf/infoWindowMap.js');
var InfoWindowActions=require('../../../actions/infoWindowActions.js');
var InfoWindowStore=require('../../../stores/infoWindowStore.js');
var If=require('../../commons/if.jsx')
var HighCharts = require('highcharts-browserify');

var MyActivities = React.createClass({
  render: function() {
    var items = [];
    if(this.props.data){
      items = this.props.data;
    }
    return (
        <ul>
        {
          items.map(function(node, index) {
            return <li><a href={node.link} target='_blank'>{node.name}</a></li>          
          })
        }
        </ul>
    );
  }
});

module.exports  = React.createClass({
  mixins: [Reflux.connect(InfoWindowStore)],

  componentWillMount:function(){
    console.log('popup>componentWillMount');
    var data = this._getInfoWindowData(); 
    this.setState({data: data});
  },

  _getInfoWindowData: function () {
      var filters = {filters:[{param:"st",values:["E1"]}]};
      var data = InfoWindowActions.getInfoFromAPI(InfoWindowMap.getInfoWindowData(), filters) || [];
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

  _getVarsFromPath: function() {
    var vars = [];
    var params = this.props.path.slice(this.props.path.indexOf('?') + 1).split('&');
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        vars[param[0]] = param[1];
    }
    return vars;
  },

  _getTitles: function() {
    var titleArray = [];
    if(this.state.infoWindow){
      this.state.infoWindow.map(function(node, index) {
        titleArray.push(node.title);
      });
    }
    return titleArray;
  },

  _getData: function(tabId) {
    var infoData = [];
    if(this.state.infoWindow){
      this.state.infoWindow.map(function(node, index) {
        node.value.map(function(innerNode, index) {
          if(innerNode.id==tabId){
            infoData.push(innerNode.value);
          } else {
            infoData.push();
          }
        });
      });
    }
    return infoData;
  },

  _renderChart: function() {
    console.log('chart1>_renderChart');
    var vars = this._getVarsFromPath();
    var titleArray = this._getTitles();
    var infoData = this._getData(vars["id"]);

    if(infoData.length>0 && infoData.length>vars["tab"] && infoData[vars["tab"]].length>0){
      $(this.getDOMNode()).find('.chart-not-found').get(0).style.display="none"; 
      if(vars["tab"]!=4 ){
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
            colors: ['#FFC614', '#3897D3', '#18577A', '#97CB68', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#50B432', '#FF9655', '#FFF263', '#6AF9C4'],
            chart: {
              marginTop: 20,
              width: 380,
              height: 240,
              plotBorderWidth: null,
              renderTo: 'container',
              type: 'pie',
            },
            title: {
              align: "left",
              text: titleArray[vars["tab"]],
              style: { 
                "color": "#4278AA", 
                "fontSize": "14px" 
              }
            },
            plotOptions: {
              pie: {
                  innerSize: "70%",
                  name: 'Quantity',
                  animation: false,
                  dataLabels: {
                      enabled: false
                  },
                  showInLegend: true
              }
            },
            legend: {
              enabled: true,
              layout: 'vertical',
              align: 'right',
              itemStyle: {
                  color: '#4F4F4F'
              },
              verticalAlign: 'middle',
              labelFormatter: function() {
                return this.name + ' ' + this.y + '%';
              }
            },
            series: [{data: chartdata}]
          },
          // using 
          function(chart) { // on complete
              var xpos = '20%';
              var ypos = '23%';
              var circleradius = 0;
          // Render the circle
          chart.renderer.circle(xpos, ypos, circleradius).attr({
              fill: '#ddd',
          }).add();
        });
      }
    } else {
      $(this.getDOMNode()).find('.chart-not-found').get(0).style.display="";  
    }
  },


  render: function() {
      console.log('chart1>render');
      var vars = this._getVarsFromPath();
      var titleArray = this._getTitles();
      var infoData = this._getData(vars["id"]);
      return (
        <div className="chart">
          <div className="chart-container" id="container"></div>
          <If condition={vars["tab"]==4} >
            <div className="activities-content">
              <div className="sub-activities-title">{titleArray[vars["tab"]]}</div>
              <MyActivities data={infoData[4]} />
            </div>
          </If>
          <div className="chart-not-found">There where no results available</div>
        </div>
      );
    }
});