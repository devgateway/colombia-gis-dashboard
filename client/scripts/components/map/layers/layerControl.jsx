'use strict';

var React = require('react/addons');

var Reflux = require('reflux');
var ArcgisLayerStore = require('../../../stores/arcgisLayerStore.js');
var ArcgisLayerActions = require('../../../actions/arcgisLayersActions.js')
var _=require('lodash')

var Toggler=require('../../commons/toggler.jsx').Toggler;
var TogglerContent=require('../../commons/toggler.jsx').TogglerContent;
var If=require('../../commons/if.jsx')

var DataLayerControl=require('./_dataLayerControl.jsx');

var Mixins={

  _handleOpacityChanged: function(value) {
    this.setState(_.assign(this.state,{'opacity':value}));
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
      'opacity':this.props.opacity,
      'checked': this.props.visible
    };
  },
}

var Layer=React.createClass({

  mixins:[Mixins],

  componentDidUpdate :function(prevProps,prevState){
    if (prevProps.opacity!=this.props.opacity){
     var opacity=this.props.opacity*100;
     $(this.getDOMNode()).find('.slider').slider('value',opacity);
   }
 },

 componentDidMount:function(){
  var opacity=this.props.opacity;
  $(this.getDOMNode()).find('.slider')
  .slider({
    change:function(event,source){
      if (event.originalEvent) {
        this._handleOpacityChanged(source.value);
      }
    }.bind(this),
    max: 100,
    value:(opacity*100) 
  })
  .slider("pips", {
    rest: false
  });
},

componentWillReceiveProps :function(nextProps){
  this.setState({checked:nextProps.visible});
},

render: function() {
  console.log("Layer Control > Layer : Rendering now .. checked ==" + this.state.checked )
  return (
    <div>
    <div className='updown'>
    <If condition={this.props.onMoveUp}>
    <i className="fa fa-arrow-up" onClick={this._up}></i>
    </If>
    <If condition={this.props.onMoveDown}>
    <i onClick={this._down} className="fa fa-arrow-down"></i>
    </If>
    </div>
    <div className="title">
    <If condition={this.props.onChangeVisibility}>
    <input type="checkbox" checked={this.state.checked} onChange={this._handleChageVisibility}/> 
    </If>
    {this.props.title}
    </div>  
    <div className='slider-holder'>
    <div className='slider'/>
    </div>
    </div>
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
      <div>
      <Toggler ref='toggler'>


      <TogglerContent visibleWhen="collapsed">
      <div toggler={true} className="toggler-btn"><i className="fa fa-plus-square-o"></i></div>
      </TogglerContent>

      <TogglerContent visibleWhen="expanded">
      <div toggler={true} className="toggler-btn"><i className="fa fa-minus-square-o"></i></div>
      </TogglerContent>

      <TogglerContent visibleWhen="always">
      <Layer    onRemove={this.props.onRemove}
      opacity={this.props.opacity}
      visible={this.props.visible}  
      onChangeVisibility={this.props.onChangeVisibility} 
      onChangeOpacity={onChangeOpacity}
      title={this.props.title} 
      id={this.props.id} />
      </TogglerContent>

      <TogglerContent visibleWhen="expanded">
      <div className="clear-fix"/>
      <ul>
      {
        this.props.layer.layers.map(function(l){
          return (<li><Layer  
            opacity={l.opacity}
            visible={l.visible}  
            onChangeOpacity={onChangeOpacity} 
            onChangeVisibility={onChangeVisibility} title={l.name} id={id}  idx={l.id.toString()}/></li>)
        }.bind(this))
      }
      </ul>
      </TogglerContent>
      </Toggler>
      </div>)
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
    console.log("Layer Control > Render .." );
    var tiles=_.sortBy(_.filter(this.state.layers,{type:'Map Service'}),'zIndex').reverse();
    var features=_.sortBy(_.filter(this.state.layers,{type:'Feature Service'}),'zIndex').reverse();
    return (
      

    <ul className="layer-control">
        <li>
      <h3>Data Layers</h3>
      </li>
      <DataLayerControl/>


      <If condition={features.length > 0} >
      <li>
      <h3>Overlays</h3>
      </li>
      </If>
      {
        features.map(function(l){
         return (<li>
          <FeatureLayer 
          
          onChangeOpacity={this._handleChangeOpacity}
          onChangeVisibility={this._changevisibility}
          id={l.id}
          type={l.type}
          zIndex={l.zIndex} 
          visible={l.visible}
          layer={l.layer}
          opacity={l.opacity}
          title={l.title} /></li>)
       }.bind(this))
      }
      <If condition={tiles.length > 0} >

      <li>
      <h3>Tiles</h3>
      </li>
      </If>
      {
        tiles.map(function(l){
         return (
          <li> <Layer 
          onMoveUp={this._handleMoveUp}
          onMoveDown={this._handleMoveDown}
          onChangeOpacity={this._handleChangeOpacity}
          onChangeVisibility={this._changevisibility}
          id={l.id}
          type={l.type}
          zIndex={l.zIndex} 
          visible={l.visible}
          opacity={l.opacity}
          title={l.title} /></li>)

       }.bind(this))
      }
      
      </ul>);
}});

