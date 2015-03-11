'use strict';

var React = require('react/addons')
var RouteHandler = require('react-router').RouteHandler;
var SlideBar=require('./containers/slideBar.jsx');
var MapActions=require('../actions/mapActions.js')
var Link = require('react-router').Link;
var Message=require('./lanMessage.jsx');


/*
    <span> value="Topographic">Topographic<options>
    <option value="Streets">Streets</option>
    <option value="NationalGeographic">National Geographic<options>
    <option value="Oceans">Oceans<options>
    <option value="Gray">Gray<options>
    <option value="DarkGray">Dark Gray<options>
    <option value="Imagery">Imagery<options>
    <option value="ShadedRelief">Shaded Relief<options>

 */

var BaseMapItem= React.createClass({

   handleClick: function(event) {
     MapActions.changeBaseMap(this.state.value);
  },

   getInitialState: function() {
      return {value:this.props.value, label:this.props.label};
  },

  render: function() {
    return(<span onClick={this.handleClick} className="btn"><Message message={this.state.label}/></span>);
  }

});


module.exports = React.createClass({
  
  render: function() {

   return(   
      <div className="small"><Message message="map.baseMaps.title"/>
      <BaseMapItem label="map.baseMaps.gray" value="Gray"/> 
      <BaseMapItem label="map.baseMaps.topo" value="Topographic"/> 
      <BaseMapItem label="map.baseMaps.natGeo" value="NationalGeographic"/> 
      <BaseMapItem label="map.baseMaps.darkGray" value="DarkGray"/> 
      <BaseMapItem label="map.baseMaps.image" value="Imagery"/> 
      <BaseMapItem label="map.baseMaps.streets" value="Streets"/>
      </div>   
    );
  }
});
