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
var NoResultsPopup=require('./NoResultsPopup.jsx');


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
    
    return (
    <div>
      <div className="layer-control-toggle">
        <h3><Message message='layers.dataLayers'/></h3>
      </div>
      <div className="layer-control-panel">
        <NoResultsPopup/>
        <ul className="layer-control">
          <li>
            <PointsLayerControl/>
          </li>
          <li>
            <ShapesLayer/>
          </li>
          <li>
            <Indicators/>
          </li>          
        </ul>
      </div>
    </div>
  );
}});
