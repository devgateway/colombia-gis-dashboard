'use strict';
var React = require('react/addons');
var Reflux = require('reflux');
var ArcgisLayerStore = require('../../../stores/arcgisLayerStore.js');
var ArcgisLayerActions = require('../../../actions/arcgisLayersActions.js')
var _=require('lodash')
var Toggler=require('../../commons/toggler.jsx').Toggler;
var TogglerContent=require('../../commons/toggler.jsx').TogglerContent;
var If=require('../../commons/if.jsx');

var PointsLayerControl=require('./_pointsLayerControl.jsx');
var ShapesLayer=require('./_shapesLayerControl.jsx');

var Layer=require('./_layer.jsx');

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
          <Layer onRemove={this.props.onRemove}
          opacity={this.props.opacity}
          visible={this.props.visible}  
          onChangeVisibility={this.props.onChangeVisibility} 
          onChangeOpacity={onChangeOpacity}
          title={this.props.title} 
          id={this.props.id}/>
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

  _onDelete: function(id) {
    ArcgisLayerActions.changeLayerValue('delete', id); //TODO:property mame should be in a globar variable 

  },


  render: function() {
    var tiles=_.sortBy(_.filter(this.state.layers,{type:'Map Service'}),'zIndex').reverse();
    var features=_.sortBy(_.filter(this.state.layers,{type:'Feature Service'}),'zIndex').reverse();
    return (
    <ul className="layer-control">
      <li>
        <h3>Data Layers</h3>
      </li>
        
        <PointsLayerControl/>
        <div className="clearFix" />
        <ShapesLayer/>

        <If condition={features.length > 0} >
          <li>
            <h3>Overlays</h3>
          </li>
        </If>
      {
        features.map(function(l){
      return (
          <li>
         
                 <FeatureLayer  onChangeOpacity={this._handleChangeOpacity} onChangeVisibility={this._changevisibility}
                          id={l.id} type={l.type} zIndex={l.zIndex}  visible={l.visible}  layer={l.layer}  opacity={l.opacity} title={l.title} />
          </li>
        )
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
          onDelete={this._onDelete} 
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


