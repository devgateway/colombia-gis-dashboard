'use strict';
var React = require('react/addons');
var Reflux = require('reflux');
var ArcgisLayerStore = require('../../../stores/arcgisLayerStore.js');
var ArcgisLayerActions = require('../../../actions/arcgisLayersActions.js')
var _=require('lodash')
var Toggler=require('../../commons/toggler.jsx').Toggler;
var TogglerContent=require('../../commons/toggler.jsx').TogglerContent;
var If=require('../../commons/if.jsx');
var LanStore=require('../../../stores/lanStore.js');

var PointsLayerControl=require('./_pointsLayerControl.jsx');
var ShapesLayer=require('./_shapesLayerControl.jsx');
var Indicators=require('./_indicatorsLayerControl.jsx');


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
          <div toggler={true} className="toggler-btn"><i className="fa fa-chevron-down"></i></div>
        </TogglerContent>

        <TogglerContent visibleWhen="expanded">
          <div toggler={true} className="toggler-btn"><i className="fa fa-chevron-up"></i></div>
        </TogglerContent>
        <TogglerContent visibleWhen="always">
          <div><span className="control-title">{this.props.title}</span></div>
        </TogglerContent>
      
        <TogglerContent visibleWhen="expanded">
          <Layer onDelete={this.props.onDelete} 
          onRemove={this.props.onRemove}
          opacity={this.props.opacity}
          visible={this.props.visible}  
          onChangeVisibility={this.props.onChangeVisibility} 
          onChangeOpacity={onChangeOpacity}
          id={this.props.id}/>
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
  mixins: [Reflux.listenTo(ArcgisLayerStore,"_onStatusChange"), Reflux.connect(LanStore, 'lan')],

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
    <div>
      <div className="layer-control-toggle">
        <h3><Message message='layers.dataLayers'/></h3>
      </div>
      <div className="layer-control-panel">
        <ul className="layer-control">
         <li>
            <Indicators/>
          </li>
        <li>
            <PointsLayerControl/>
          </li>
          <li>
            <ShapesLayer/>
          </li>
        </ul>
      </div>

      <If condition={features.length > 0} >
        <div className="layer-control-toggle">
          <h3>Overlays</h3>
        </div>
        <div className="layer-control-panel">
          <ul className="layer-control">        
          {
            features.map(function(l){
            return (
                <li>
                  <Toggler ref='toggler'>
                    <TogglerContent visibleWhen="collapsed">
                      <div toggler={true} className="toggler-button"><i className="fa fa-chevron-down"></i></div>
                    </TogglerContent>
                    <TogglerContent visibleWhen="expanded">
                      <div toggler={true} className="toggler-button"><i className="fa fa-chevron-up"></i></div>
                    </TogglerContent>
                    <TogglerContent visibleWhen="always">
                      <div><span className="control-title">{l.title}</span></div>
                    </TogglerContent>
                    <TogglerContent visibleWhen="expanded">                            
                      <FeatureLayer 
                      onDelete={this._onDelete} 
                      onChangeOpacity={this._handleChangeOpacity} 
                      onChangeVisibility={this._changevisibility}
                      id={l.id} type={l.type} 
                      zIndex={l.zIndex}  
                      visible={l.visible}  
                      layer={l.layer}  
                      opacity={l.opacity}/>
                    </TogglerContent>
                  </Toggler>  
                </li>
              )
             }.bind(this))
          }
          </ul>
        </div>
      </If>
        
      <If condition={tiles.length > 0} >
        <div className="layer-control-toggle">
          <h3>Tiles</h3>
        </div>
        <div className="layer-control-panel">
          <ul className="layer-control">        
          {
            tiles.map(function(l){
             return (
              <li> 
                <Toggler ref='toggler'>
                  <TogglerContent visibleWhen="collapsed">
                    <div toggler={true} className="toggler-button"><i className="fa fa-chevron-down"></i></div>
                  </TogglerContent>
                  <TogglerContent visibleWhen="expanded">
                    <div toggler={true} className="toggler-button"><i className="fa fa-chevron-up"></i></div>
                  </TogglerContent>
                  <TogglerContent visibleWhen="always">
                    <div><span className="control-title">{l.title}</span></div>
                  </TogglerContent>
                  <TogglerContent visibleWhen="expanded">        
                    <Layer
                    onDelete={this._onDelete} 
                    onMoveUp={this._handleMoveUp}
                    onMoveDown={this._handleMoveDown}
                    onChangeOpacity={this._handleChangeOpacity}
                    onChangeVisibility={this._changevisibility}
                    id={l.id}
                    type={l.type}
                    zIndex={l.zIndex} 
                    visible={l.visible}
                    opacity={l.opacity}/>
                  </TogglerContent>
                </Toggler>
              </li>)
           }.bind(this))
          }
          </ul>
        </div>
      </If>
    </div>
  );
}});


