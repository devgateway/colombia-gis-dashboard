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


var Layer=require('./_layer.jsx');
var InnerLayer=require('./_innerLayer.jsx');

var FeatureLayer=React.createClass({

  render:function(){
    var onChangeOpacity=this.props.onChangeOpacity;
    var onChangeVisibility=this.props.onChangeVisibility;
    var id=this.props.id;
    var defaultVisibility=this.props.visible;

    return (
      <div>
        <Layer onDelete={this.props.onDelete}
          onRemove={this.props.onRemove}
          opacity={this.props.opacity}
          visible={this.props.visible}
          showBasicControl={this.props.showBasicControl}
          title={this.props.title}
          onChangeVisibility={this.props.onChangeVisibility}
          onChangeOpacity={onChangeOpacity}
          id={this.props.id}/>
        <If condition={!this.props.showBasicControl}>
          <ul>
            {
              this.props.layer.layers.map(function(l){
                return (<li><InnerLayer
                opacity={l.opacity}
                visible={l.visible}
                onChangeOpacity={onChangeOpacity}
                onChangeVisibility={onChangeVisibility} title={l.name} id={id}  idx={l.id.toString()}/></li>)
              }.bind(this))
            }
          </ul>
        </If>
      </div>
    )
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
    ArcgisLayerActions.changeLayerValue('visible', id, value,idx); 
  },

  _handleChangeOpacity: function(id, value,idx) {
    ArcgisLayerActions.changeLayerValue('opacity', id, value,idx); 
  },

  _handleMoveUp: function(id) {
    ArcgisLayerActions.changeLayerValue('moveUp', id);
  },

  _handleMoveDown: function(id) {
    ArcgisLayerActions.changeLayerValue('moveDown', id); 
  },

  _onDelete: function(id) {
    ArcgisLayerActions.changeLayerValue('delete', id); 
  },


  render: function() {
    var tiles=_.sortBy(_.filter(this.state.layers,{type:'Map Service'}),'zIndex').reverse();
    var features=_.sortBy(_.filter(this.state.layers,{type:'Feature Service'}),'zIndex').reverse();

    return (
    <div>
      <If condition={features.length > 0} >
        <div className="layer-control-toggle">
          <h3>Overlays</h3>
        </div>
        <div className="layer-control-panel">
          <ul className="layer-control">
          {
            features.map(function(l){
            return (
                <li className="external-layer-control">
                  <Toggler ref='toggler'>
                    <TogglerContent visibleWhen="collapsed">
                      <div toggler={true} className="toggler-button"><i className="fa fa-chevron-down"></i></div>
                    </TogglerContent>
                    <TogglerContent visibleWhen="expanded">
                      <div toggler={true} className="toggler-button"><i className="fa fa-chevron-up"></i></div>
                    </TogglerContent>
                    <TogglerContent visibleWhen="collapsed">
                      <FeatureLayer
                        onDelete={this._onDelete}
                        onChangeOpacity={this._handleChangeOpacity}
                        onChangeVisibility={this._changevisibility}
                        id={l.id} type={l.type}
                        zIndex={l.zIndex}
                        visible={l.visible}
                        layer={l.layer}
                        opacity={l.opacity}
                        title={l.title}
                        showBasicControl={true}/>
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
                        opacity={l.opacity}
                        title={l.title}/>
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
