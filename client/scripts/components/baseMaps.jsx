'use strict';

var React = require('react/addons')
var Reflux = require('reflux');
var RouteHandler = require('react-router').RouteHandler;
var SlideBar=require('./containers/slideBar.jsx');
var MapActions=require('../actions/mapActions.js');
var MapStore=require('../stores/mapStore.js');
var Link = require('react-router').Link;


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
    var currentBaseMap = MapStore.getCurrentBaseMap();
    if (currentBaseMap == this.state.value){
      return(<b><span className="basemap-option" onClick={this.handleClick}> {this.state.label} </span></b>);
    } else {
      return(<span className="basemap-option" onClick={this.handleClick}> {this.state.label} </span>);
    }    
  }

});


module.exports = React.createClass({
  mixins: [Reflux.connect(MapStore)],
  render: function() {    
    return(   
      <div className="small">
        <i className="glyphicon glyphicon-globe"/>BASE MAP  
        <BaseMapItem label="Gray" value="Gray" /> | 
        <BaseMapItem label="Topographic" value="Topographic"/> | 
        <BaseMapItem label="National Geographic" value="NationalGeographic"/> | 
        <BaseMapItem label="Dark Gray" value="DarkGray"/> | 
        <BaseMapItem label="Imagery" value="Imagery"/> | 
        <BaseMapItem label="Streets" value="Streets"/>
      </div>   
    );
  }
});
