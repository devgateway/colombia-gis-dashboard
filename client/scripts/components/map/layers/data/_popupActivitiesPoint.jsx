'use strict';

var React = require('react');
var Reflux = require('reflux');
var Store=require('../../../../stores/infoWindowStore.js');
var If=require('../../../commons/if.jsx');
var Loading = require('../../../commons/loading.jsx');
var Mixins = require('./_popupMixins.js');

var MyActivities = React.createClass({
  render: function() {
    var items = [];
    if(this.props.data){
      items = this.props.data;
    }
    var link;
    if(this.props.externalFile){
      this.props.externalFile.map(function(l){link=l.value})
    }
    return (
      <div>
        <div className="subactivities-list">
        <Message message='map.popup.programList'/>: {items.length}
        <ul>
        {
          items.map(function(node, index) {
            return <li>{node.name} - ({node.value})</li>
          })
        }
        </ul></div>
        <If condition={link}>
          <div><a className="btn btn-apply" href={link} target='_blank'><Message message='map.popup.downloadFile'/></a></div>
        </If>
      </div>
    );
  }
});

module.exports  = React.createClass({
  mixins: [Mixins, Reflux.connect(Store)],

  componentWillMount:function(){
    console.log('_popupActivitiesPoint>componentWillMount');
    this._getInfoData(this.props.id, this.props.level, this.props.filters, 'points');
  },

  componentDidMount: function() {
    console.log('_popupActivitiesPoint>componentDidMount');
    this._renderChart();
  },

  componentWillUpdate: function(props,newState) {
    console.log('_popupActivitiesPoint>componentWillUpdate');
    var previousId = 0;
    if(newState.infoWindowFilter){
      newState.infoWindowFilter.map(function(node){node.values.map(function(innerNode){previousId = innerNode})});
    }
    if(previousId!=props.id || props.filters!=this.props.filters){
      this._getInfoData(props.id, props.level, props.filters, 'points');
    }
  },

  componentDidUpdate: function(props,newState) {
    console.log('_popupActivitiesPoint>componentDidUpdate');
    this.props.onChange();
    this._renderChart();
  },

  handleClick:function(tabId){
    console.log('_popupActivitiesPoint>click');
    this.setState({'tabId':tabId});
    this.forceUpdate();

  },


  render: function() {
    console.log('_popupActivitiesPoint>render id:' + this.props.id +" tab "+this.state.tabId);
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
      <div>
        <div className="leaflet-popup-content">
          <div className="panel panel-default" >
            <div className="panel-heading popup-header" >
              <h3 className="panel-title" >{this.props.name}</h3>
              <span className="title-label"> - <Message message="map.popup.totalActivities"/></span>
            </div>
            <div className="popup-nav-wrapper">
              <nav className="tabs" role="tablist" >
                <ul className="tabs nav nav-tabs" role="tablist" >
                <li className={tabId==0? "active" : ""} role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 0)}>
                    <span className="popup-icon chart" title="Cost Share Breakdown"></span>
                  </a>
                </li>
                <li className={tabId==1? "active" : ""} role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 1)}>
                    <span className="popup-icon funding-dev-obj" title="Development Objectives"></span>
                  </a>
                </li>
                <li className={tabId==2? "active" : ""} role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 2)}>
                    <span className="popup-icon subactivities" title="Activity Classication"></span>
                  </a>
                </li>
                <li className={tabId==3? "active" : ""} role="tab" >
                  <a href="#" onClick={this.handleClick.bind(this, 3)}>
                    <span className="popup-icon export" title="Public Private Partnership"></span>
                  </a>
                </li>
                <li className={tabId==4? "active" : ""} role="tab" >
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
                  <MyActivities data={infoData[4]} externalFile={infoData[5]} />
                </div>
              </If>
            </div>
          </div>
        </div>
      </div>
    );
}

});
