'use strict';

var React = require('react/addons')
var Reflux = require('reflux');
var RouteHandler = require('react-router').RouteHandler;
var SlideBar=require('./containers/slideBar.jsx');
var MapActions=require('../actions/mapActions.js')
var MapActions=require('../actions/mapActions.js');
var MapStore=require('../stores/mapStore.js');
var Link = require('react-router').Link;


var BaseMapItem= React.createClass({
  
   handleClick: function(event) {
     MapActions.changeBaseMap(this.state.value);
  },

   getInitialState: function() {
      return {value:this.props.value, label:this.props.label};
  },

  render: function() {
    var currentBaseMap = MapStore.getCurrentBaseMap();
    return(<span  className="basemap-option" onClick={this.handleClick}> {this.state.label} </span>);
        
  }

});
