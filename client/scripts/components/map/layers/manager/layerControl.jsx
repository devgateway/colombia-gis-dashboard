'use strict';

var React = require('react');
var Reflux = require('reflux');

var ArcgisLayerStore = require('../../../../stores/arcgisLayerStore.js');
var ArcgisLayerActions = require('../../../../actions/arcgisLayersActions.js')

var Slider= require('react-slider')
var placeholder = document.createElement("li");
var _=require('lodash')



var Layer=React.createClass({


  _handleOpacityChanged: function(value) {
    this.props.onChangeOpacity(this.props.id, (value / 100));
  },

  _handleChageVisibility: function() {
    var newValue=!this.state.checked;
    this.setState({'checked':newValue})
    this.props.onChangeVisibility(this.props.id,newValue);
  },

  _up: function() {
    this.props.onMoveUp(this.props.id);
  },

  _down: function() {
    this.props.onMoveDown(this.props.id);
  },

  getInitialState: function() {
    return {
      checked: this.props.visible
    };
  },

  render: function() {
    console.log("Layer Control > Layer : Rendering now ..")
    debugger;
    return (
      <li>
      <input type="checkbox" checked={this.state.checked} onChange={this._handleChageVisibility}/> {this.props.title}      <i className="fa fa-arrow-up" onClick={this._up}></i> <i onClick={this._down} className="fa fa-arrow-down"></i>
      <div>
      <Slider  defaultValue={[100]} withBars  className="horizontal-slider" onChange={this._handleOpacityChanged}/>
      </div>
      </li>
      );   
  }
});


module.exports  = React.createClass({
  mixins: [Reflux.listenTo(ArcgisLayerStore,"_onStatusChange")],

  _onStatusChange: function(status) {
    this.setState(status); //create a new array in order to isolate the state
  },

  getInitialState: function() {
    return {}; //{layers:ArcgisLayerStore.getInitialState().leafletLayers.slice(0)};
  },

  _changevisibility: function(id, value) {
    ArcgisLayerActions.changeLayerValue('visible', id, value); //TODO:property mame should be in a globar variable 
  },

  _handleChangeOpacity: function(id, value) {
    ArcgisLayerActions.changeLayerValue('opacity', id, value); //TODO:property mame should be in a globar variable 

  },

  _handleMoveUp: function(id) {
    ArcgisLayerActions.changeLayerValue('moveUp', id); //TODO:property mame should be in a globar variable 

  },

  _handleMoveDown: function(id) {
    ArcgisLayerActions.changeLayerValue('moveDown', id); //TODO:property mame should be in a globar variable 

  },

  render: function() {
    var sortedLayer=_.sortBy(this.state.layers,'zIndex').reverse();
    return (
      <div className="layer-control">
      <h3>Contextual Layers</h3>
      <ul onDragOver={this.dragOver}>
      {sortedLayer.map(function(l){
       return (
        <Layer 
        onMoveUp={this._handleMoveUp}
        onMoveDown={this._handleMoveDown}
        onChangeOpacity={this._handleChangeOpacity}
        onChangeVisibility={this._changevisibility}

        getMap={this.props.getMap} 

        id={l.id}
        type={l.type}
        zIndex={l.zIndex} 
        visible={l.visible}
        layer={l.leafletLayer}
        opacity={l.opacity}
        title={l.title} />)

     }.bind(this))}
      </ul>
      </div>
      );
  }


});


