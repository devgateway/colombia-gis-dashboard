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
    this._getCostShareBreakDown(); 
  },

  _getCostShareBreakDown: function () {
      return InfoWindowActions.getInfoFromAPI(InfoWindowMap.getCostShareBreakDown()) || [];
  },

  _getDevelopmentObjectives: function () {
      return InfoWindowActions.getInfoFromAPI(InfoWindowMap.getDevelopmentObjectives()) || [];
  },

  handleSelect(key) {
    console.log('popup>handleSelect key=' + key);
    if(key == "1"){
        this._getCostShareBreakDown();
    } else if(key == "2"){
        this._getDevelopmentObjectives();
    }
  },


  render: function() {
    console.log('popup>render');
    debugger;
    var self = this;
    if (!this.props){
      return (<p></p>)
    }
    
    return (
      <div className="leaflet-popup-content-wrapper">
        <TabbedArea className="leaflet-popup-content" defaultActiveKey={1} onSelect={this.handleSelect}>
          <TabPane className="popup-icon chart" eventKey={1} tab="By Origin">
              <MyChart infoWindow={this.state.infoWindow} type="pie"/>
          </TabPane>
          <TabPane className="popup-icon funding-dev-obj" eventKey={2} tab="By Objective" >
              <MyChart infoWindow={this.state.infoWindow} type="treeMap"/>
          </TabPane>
        </TabbedArea>
      </div>

     )
}

});
