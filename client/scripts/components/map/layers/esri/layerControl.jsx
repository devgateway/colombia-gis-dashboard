'use strict';

var React = require('react');
var Reflux = require('reflux');
var ArcgisLayerStore = require('../../../../stores/arcgisLayerStore.js');
var ArcgisLayerActions = require('../../../../actions/arcgisLayersActions.js')
var _=require('lodash')


var If=React.createClass({
  render:function(){
   if (this.props.condition){
    return <span>{this.props.children}</span>
  }else{
    return null;
  }
}
});

var Layer=React.createClass({

  _handleOpacityChanged: function(value) {
    this.props.onChangeOpacity(this.props.id, (value / 100),this.props.idx);
  },

  _handleChageVisibility: function() {
    var newValue=!this.state.checked;
    this.setState({'checked':newValue})
    this.props.onChangeVisibility(this.props.id,newValue,this.props.idx);
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

  componentDidMount:function(){
    //var _this=this;
    $(this.getDOMNode()).find('.slider')
    .slider({
      change:function(event,source){
        this._handleOpacityChanged(source.value);
      }.bind(this),
      max: 100,
      value:100
    })
    .slider("pips", {
      rest: false
    });
  },

  render: function() {
    console.log("Layer Control > Layer : Rendering now ..")
    return (
      <li>
       <div className='updown'>
            <If condition={this.props.onMoveUp}>
                <i className="fa fa-arrow-up" onClick={this._up}></i>
            </If>
            <If condition={this.props.onMoveDown}>
                <i onClick={this._down} className="fa fa-arrow-down"></i>
            </If>
          </div>

          <div className="title">
           <input type="checkbox" checked={this.state.checked} onChange={this._handleChageVisibility}/> 
            {this.props.title}
          </div>      
         
         
        
          <div className='slider-holder'>
            <div className='slider'/>
          </div>
      </li>
      );   
  }
});




var FeatureLayer=React.createClass({

  render:function(){
    var onChangeOpacity=this.props.onChangeOpacity;
    var onChangeVisibility=this.props.onChangeVisibility;
    var id=this.props.id;
    var defaultVisibility=this.props.visible;
    return (
      <li>
      <p className="title">{this.props.title}</p> 
      <ul>
      {
        this.props.layer.layers.map(function(l){
          return (<Layer  visible={defaultVisibility}  onChangeOpacity={onChangeOpacity}  onChangeVisibility={onChangeVisibility}  title={l.name} id={id}          idx={l.id.toString()}/>)
        })
      }
      </ul>
      </li>);
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

  _changevisibility: function(id, value,idx) {
    ArcgisLayerActions.changeLayerValue('visible', id, value,idx); //TODO:property mame should be in a globar variable 
  },

  _handleChangeOpacity: function(id, value,idx) {
    ArcgisLayerActions.changeLayerValue('opacity', id, value,idx); //TODO:property mame should be in a globar variable 

  },

  _handleMoveUp: function(id) {
    ArcgisLayerActions.changeLayerValue('moveUp', id); //TODO:property mame should be in a globar variable 

  },

  _handleMoveDown: function(id) {
    ArcgisLayerActions.changeLayerValue('moveDown', id); //TODO:property mame should be in a globar variable 

  },

  render: function() {
    var tiles=_.sortBy(_.filter(this.state.layers,{type:'Map Service'}),'zIndex').reverse();

    var features=_.sortBy(_.filter(this.state.layers,{type:'Feature Service'}),'zIndex').reverse();

    return (
     <ul className="layer-control">
     <li>
        <h3>Overlays</h3>
    </li>
    <li><div className="title">Data Layers (define options here )</div></li>
     {
      features.map(function(l){

       return (
        <FeatureLayer
        onChangeOpacity={this._handleChangeOpacity}
        onChangeVisibility={this._changevisibility}
        id={l.id}
        type={l.type}
        zIndex={l.zIndex} 
        visible={l.visible}
        layer={l.layer}
        opacity={l.opacity}
        title={l.title} />

        )

     }.bind(this))}
      <li>
        <h3>Tiles</h3>
      </li>
      {
        tiles.map(function(l){

         return (
           <Layer 
           onMoveUp={this._handleMoveUp}
           onMoveDown={this._handleMoveDown}
           onChangeOpacity={this._handleChangeOpacity}
           onChangeVisibility={this._changevisibility}

           id={l.id}
           type={l.type}
           zIndex={l.zIndex} 
           visible={l.visible}

           opacity={l.opacity}
           title={l.title} />)

       }.bind(this))}
        </ul>

        );
}


});


