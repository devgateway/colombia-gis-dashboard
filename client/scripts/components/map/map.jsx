'use strict';

/*
 * Leaflet map component wrapper for React
 *
 * This component is a wrapper providing a friendly react-like API to other
 * components and connecting some pieces for the real leaflet
 */
 var React = require('react/addons');
var Reflux = require('reflux');
var MapStore = require('../../stores/mapStore.js');
var MapActions = require('../../actions/mapActions.js');
var LeafletMap = require('./_mapLeaflet.jsx');
var EsriLayers=require('./layers/esri/esriLayers.jsx');

var PointsLayer=require('./layers/data/pointsLayer.jsx');
var Loading = require('../commons/loading.jsx')
var ShapesLayer=require('./layers/data/shapesLayer.jsx');

var AGOLbtnLogin=require('../esri/AGOLBtnLogin.jsx');
var LegendControl = require('./layers/esri/legendControl.jsx');


 module.exports = React.createClass({

  mixins: [ Reflux.connect(MapStore, 'mapStatus')],

  updateCurrentBounds: function(newMapViewBounds) {
    MapActions.changeBounds.user(newMapViewBounds);
  },

  getMap: function() {
    return this.refs.leafletMapComponent.getLeafletMap();
  },


 componentWillMount :function(){
 },    

 render: function() {
   // pass a function down to children through props to access the leaflet map
   var children = React.Children.map(this.props.children, function(child) {
    return child ? React.addons.cloneWithProps(child, {getMap: this.getMap}) : null;
  }, this);
   var bounds = this.state.mapStatus.bounds;
   var baseMap= this.state.mapStatus.baseMap;
   console.log('Map>map: Render');
   return (

     <div>
     
     <LeafletMap ref="leafletMapComponent" baseMap={baseMap} bounds={bounds} onMapMove={this.updateCurrentBounds}/>
      <AGOLbtnLogin/>
      <Loading/>
      <LegendControl/>
      <PointsLayer getMap={this.getMap}/>
      <ShapesLayer getMap={this.getMap}/>
      <EsriLayers getMap={this.getMap}/>
        {children} 
     </div>
     )
 }
});
