'use strict';

var React = require('react');
var Reflux = require('reflux');
var HighCharts = require('highcharts-browserify');
var InfoWindowActions=require('../../../../actions/infoWindowActions.js');
var InfoWindowStore=require('../../../../stores/infoWindowStore.js');
var If=require('../../../commons/if.jsx');
var Loading = require('../../../commons/loading.jsx')

var MyActivities = React.createClass({
  render: function() {
    var items = [];
    if(this.props.data){
      items = this.props.data;
    }
    return (
        <div className="subactivities-list">
        <Message message='map.popup.totalSubActivities'/>: {items.length}
        <ul> 
        {
          items.map(function(node, index) {
            return <li>{node.name}</li>          
          })
        }
        </ul></div>
    );
  }
});

module.exports  = React.createClass({
  mixins: [Reflux.connect(InfoWindowStore)],

  componentWillMount:function(){
    console.log('popup2>componentWillMount');
    this._getInfoWindowData(this.props.id, this.props.level, this.props.filters); 
  },

  _getInfoWindowData: function (id, level, filters) {
    var param = level? level.substring(0,2) : "de";
    var infoWindow = [{"param":param,"values":[id]}];
    var data = InfoWindowActions.getInfoFromAPI(infoWindow, filters) || [];
    return data;
  },

  componentDidMount: function() {
    console.log('popup2>componentDidMount');
    this._renderChart();
  },

  componentWillUpdate: function(props,newState) { 
    console.log('popup2>componentWillUpdate'); 
    var previousId = 0;
    if(newState.infoWindowFilter){
      newState.infoWindowFilter.map(function(node){node.values.map(function(innerNode){previousId = innerNode})});
    }
    if(previousId!=props.id || props.filters!=this.props.filters){
      this._getInfoWindowData(props.id, props.level, props.filters); 
    }
  },

  componentDidUpdate: function(props,newState) { 
    console.log('popup2>componentDidUpdate'); 
    this.props.onChange();
    this._renderChart();
  },

  setAttributeDisplay: function(classId, attr, display){
    $(classId).map(function(node, index) {
        if(index.getAttribute(attr)){
          index.style.display=display;
        }
      })
  },

  handleClick:function(tabId){
    console.log('popup2>click');
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
    console.log('popup2>_renderChart');
    var titleArray = this._getTitles();
    var infoData = this._getData();
    var tabId = this.state.tabId ? this.state.tabId : 0;

    if(infoData.length>0 && infoData.length>tabId && infoData[tabId].length>0){
      if(tabId!=4 ){
        var chartdata = [];
        var totalValue = 0;
        infoData[tabId].map(function(node, index) {
            totalValue += parseInt(node.value);
        });
        infoData[tabId].map(function(node, index) {
          var chartnode = [];
          chartnode.push(node.name);
          chartnode.push(parseInt(parseInt(node.value)/totalValue*100));
          chartdata.push(chartnode);
        });

        var chart = new HighCharts.Chart({
            colors: ['#FFC614', '#3897D3', '#18577A', '#97CB68', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#50B432', '#FF9655', '#FFF263', '#6AF9C4'],
            chart: {
              marginTop: 20,
              width: 420,
              height: 240,
              plotBorderWidth: null,
              renderTo: 'container',
              type: 'pie',
            },
            title: {
              align: "left",
              text: titleArray[tabId],
              style: { 
                "color": "#4278AA", 
                "fontSize": "14px" 
              }
            },
            plotOptions: {
              pie: {
                  innerSize: "70%",
                  name: 'Cantidad total',
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
          });
      }

    }
    this.setAttributeDisplay(".popup-nav-wrapper", "data-originalreactid", "inline");
  },

  render: function() {
    console.log('popup2>render id:' + this.props.id +" tab "+this.state.tabId);
    var tabId = this.state.tabId ? this.state.tabId : 0;
    var titleArray = this._getTitles();
    var infoData=[];
    if(tabId==4){
      infoData = this._getData(tabId);
    }
    var showLoading=true;
    if(this.state.infoWindow){
      showLoading=false;
    }
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
            <div className="panel-body">
              <div className="chart-container" id="container"></div>
              <If condition={showLoading} >
                <Loading container="popup-loading-container"/>
              </If>
              <If condition={tabId==4 && !showLoading} >
                <div className="subactivities-container">
                  <div className="sub-activities-title">{titleArray[tabId]}</div>
                  <MyActivities data={infoData[4]} />
                </div>
              </If>
            </div>
          </div>
        </div>
      </div>
    );
}

});
