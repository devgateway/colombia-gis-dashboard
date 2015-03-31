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


 var LayersStore=require('../../stores/layersStore.jsx');
 var GeoJsonLayer=require('./GeoJsonLayer.jsx');


 var ArcGisLayers=require('./esri/arcgisLayer.jsx'); 
 var ArcGisSigIn=require('./esri/arcGisSigIn.jsx');


 module.exports = React.createClass({

  mixins: [ Reflux.connect(MapStore, 'mapStatus'), Reflux.connect(LayersStore, 'layerData')],

  updateCurrentBounds: function(newMapViewBounds) {
    // Triggered whenever the map view changes, including:
    //   - initial map render
    //   - user drags or zooms the map
    //   - programatic changes to the map view
    // This function re-triggers it as an action so the mapViewStore can keep
    // track of where we are
    // The `user` child action of changeBounds signifies that we should not
    // trigger anything that might cause a re-render, just update store state.
    MapActions.changeBounds.user(newMapViewBounds);
  },

  // () -> either `L.map` instance or `undefined`
  getMap: function() {
    // TODO: is `this.refs` undefined at the beginning of the lifecycle?
    // ... if so, this could throw, and should probably handle that.
    return this.refs.leafletMapComponent.getLeafletMap();
  },


  componentWillMount :function(){
    //  MapActions.loadActivitiesByDepartments();
  },    


  render: function() {
   // pass a function down to children through props to access the leaflet map
   var children = React.Children.map(this.props.children, function(child) {
    return child ? React.addons.cloneWithProps(child, {getMap: this.getMap}) : null;
  }, this);

   var bounds = this.state.mapStatus.bounds;
   var baseMap= this.state.mapStatus.baseMap;

   return (
    <div>


    <LeafletMap   ref="leafletMapComponent" baseMap={baseMap} bounds={bounds} onMapMove={this.updateCurrentBounds} />
    <GeoJsonLayer getMap={this.getMap} features={this.state.layerData.features}></GeoJsonLayer>
    <ArcGisLayers getMap={this.getMap}></ArcGisLayers>


    {children} </div>
    );
 }
});