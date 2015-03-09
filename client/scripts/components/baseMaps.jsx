'use strict';

var React = require('react/addons')
var Reflux = require('reflux');
var MapActions=require('../actions/mapActions.js')
var MapStore=require('../stores/mapStore.js');

var BaseMapItem= React.createClass({

   handleClick: function(event) {
     MapActions.changeBaseMap(this.state.value);
  },

   getInitialState: function() {
      return {value:this.props.value, label:this.props.label};
  },

  render: function() {
    var currentBaseMap = MapStore.getCurrentBaseMap();
    var cls = currentBaseMap==this.state.value? "basemap-option-selected" : "basemap-option";
    return(<span className={cls} onClick={this.handleClick}> {this.state.label} </span>);    
  }

});


module.exports = React.createClass({
  
  mixins: [Reflux.connect(MapStore)],
  render: function() {

   return(   
      <div className="small basemap-selector">
        <i className="glyphicon glyphicon-globe"/><b>BASE MAP</b>
        <BaseMapItem label="Gray" value="Gray"/> |
        <BaseMapItem label="Topographic" value="Topographic"/> |
        <BaseMapItem label="National Geographic" value="NationalGeographic"/> |
        <BaseMapItem label="Dark Gray" value="DarkGray"/> |
        <BaseMapItem label="Imagery" value="Imagery"/> |
        <BaseMapItem label="Streets" value="Streets"/>
      </div>   
    );
  }
});
