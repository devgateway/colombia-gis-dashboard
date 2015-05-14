'use strict';

var React = require('react');
var Reflux = require('reflux');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var InfoWindowMap = require('../../../../conf/infoWindowMap.js');
var InfoWindowActions=require('../../../../actions/infoWindowActions.js');
var InfoWindowStore=require('../../../../stores/infoWindowStore.js');
var MyChart=require('./_charts.js');

module.exports  = React.createClass({
  mixins: [Reflux.connect(InfoWindowStore)],

  componentDidMount:function(){
    console.log('popup>componentDidMount');
  },

  componentWillMount:function(){
    console.log('popup>componentWillMount');
    this._getCostShareBreakDown(this.props.id); 
  },


  _getCostShareBreakDown: function (id) {
      return InfoWindowActions.getInfoFromAPI(InfoWindowMap.getCostShareBreakDown(), id) || [];
  },

  _getDevelopmentObjectives: function (id) {
      return InfoWindowActions.getInfoFromAPI(InfoWindowMap.getDevelopmentObjectives(), id) || [];
  },

  handleSelect(key) {
    console.log('popup>handleSelect selectedKey=' + key);
    this.setState({key});
    if(key == "1"){
        this._getCostShareBreakDown();
    } else if(key == "2"){
        this._getDevelopmentObjectives();
    }
  },


  render: function() {
    console.log('popup>render');
    var self = this;
    if (!this.props){
      return (<p></p>)
    }
    var chartType = "pie";
    if(this.state.key=="2"){
      chartType = "treeMap";
    }
    var chart;
    if(this.state.infoWindow){
      chart = <MyChart infoWindow={this.state.infoWindow} type={chartType}/>;
    } 
    
    return (
      <div className="leaflet-popup-content-wrapper">
        <TabbedArea className="leaflet-popup-content" defaultActiveKey={1}>
          <TabPane className="popup-icon chart" eventKey={1} tab="By Origin">
            {chart}
          </TabPane>
          <TabPane className="popup-icon funding-dev-obj" eventKey={2} tab="By Objective" >
          </TabPane>
        </TabbedArea>

      </div>

     )
}

});
