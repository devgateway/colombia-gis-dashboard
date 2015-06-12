'use strict';

var React = require('react');
var Reflux = require('reflux');
var HighCharts = require('highcharts-browserify');
var InfoWindowActions=require('../../../../actions/infoWindowActions.js');
var InfoWindowStore=require('../../../../stores/infoWindowStore.js');
var If=require('../../../commons/if.jsx');


module.exports  = React.createClass({
  mixins: [Reflux.connect(InfoWindowStore)],

  componentWillMount:function(){
    console.log('popup>componentWillMount');
    var data = this._getInfoWindowData(); 
    this.setState({data: data, tabId: 0});
  },

  _getInfoWindowData: function () {
      var filters = {filters:[{param:"st",values:["E1"]}]};
      var data = InfoWindowActions.getInfoFromAPI(filters) || [];
      return data;
  },

  componentDidMount: function() {
    console.log('chart1>componentDidMount');
    this._renderChart();
  },

  componentDidUpdate: function(props,newState) { 
    console.log('popup>componentDidUpdate'); 
    this.props.onChange();
    this._renderChart();
  },


  handleClick:function(tabId){
    console.log('popup>click');
    this.setState({'tabId':tabId});
    this.forceUpdate();
    
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
        infoData.push(node.value);
      });
    }
    return infoData;
  },

  _renderChart: function() {
    console.log('chart1>_renderChart');
    var titleArray = this._getTitles();
    var infoData = this._getData();

    if(infoData.length>0 && infoData.length>this.state.tabId && infoData[this.state.tabId].length>0){
      if(this.state.tabId!=4 ){
        var chartdata = [];
        var totalValue = 0;
        infoData[this.state.tabId].map(function(node, index) {
            totalValue += parseInt(node.value);
        });
        infoData[this.state.tabId].map(function(node, index) {
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
              text: titleArray[this.state.tabId],
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
                var name = this.name.length>21?this.name.substring(0,20):this.name;
                return name + ' ' + this.y + '%';
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
    }
  },

  render: function() {
    console.log('popup>render id:' + this.props.id +" tab "+this.state.tabId);
    var url = "./#/chart1?id="+this.props.id+"&tab="+this.state.tabId;
    var content=(  <div className="popup-content"><iframe className="iframe-content" src={url} ></iframe> </div>);
    return (
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content">
          <div className="panel panel-default" >
            <div className="panel-heading popup-header" >
              <h3 className="panel-title" >{this.props.name}</h3>
              <span className="title-label"> - <Message message="map.popup.totalActivities"/></span>
            </div>
            <div className="popup-nav-wrapper">
              <nav className="tabs" role="tablist" >
                <ul className="tabs nav nav-tabs" role="tablist" >
                <li className="active" role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 0)}>
                    <span className="popup-icon chart" title="Cost Share Breakdown"></span>
                  </a>
                </li>
                <li className="" role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 1)}>
                    <span className="popup-icon funding-dev-obj" title="Development Objectives"></span>
                  </a>
                </li>
                <li className="" role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 2)}>
                    <span className="popup-icon subactivities" title="Activity Classication"></span>
                  </a>
                </li>
                <li className="" role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 3)}>
                    <span className="popup-icon export" title="Public Private Partnership"></span>
                  </a>
                </li>
                <li className="" role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 4)}>
                    <span className="popup-icon subactivitiesList" title="Sub Activities"></span>
                  </a>
                </li>
                </ul>
              </nav>
            </div>
            <div className="panel-body" ><div className="chart-container" id="container"></div></div>
          </div>
        </div>
      </div>
    );
}

});
