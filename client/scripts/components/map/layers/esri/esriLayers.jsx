'use strict';

var React = require('react');
var Reflux = require('reflux');

var ArcgisLayerStore = require('../../../../stores/arcgisLayerStore.js')
var ArcgisLayerActions = require('../../../../actions/arcgisLayersActions.js')

var FeatureLayerClass = L.esri.featureLayer;
var MapSeverClass = L.esri.dynamicMapLayer;
var TiledMapServerClass = L.esri.tiledMapLayer;
var ImageServerClass = L.esri.imageMapLayer;

var API = require('../../../../api/esri.js');
var _ = require('lodash');


function writeLog(message){
  console.log('Map>esriLayers: '+message)
}
/*
  This reads the layer store metadata, creates the leaflet layers based on the stored data add them to the map and keep the leaflet 
  layers properties and the metadata values in synchronized, the componet is prepared for esri layers  

  */
  module.exports = React.createClass({

  //mixins: [Reflux.connect(ArcgisLayerStore, 'arcgis')],

  mixins: [Reflux.listenTo(ArcgisLayerStore, "_onStatusChange")],



  _onStatusChange: function(status) {
    var layers = status.layers.slice(0); //make a new array 

    this.setState(_.assign(_.assign({}, this.state), {
      'layers': layers
    })); //create a new array in order to isolate the state
  },

  getInitialState: function() {
    return {
      'leafletLayers': {},
      'layers': ArcgisLayerStore.getInitialState().layers.slice(0)
    }; //create a new array in order to isolate the state
  },

  _addToList: function(leafletLayer, id) {

    this.state.leafletLayers[id] = leafletLayer; //keep related the real leaflet layer and the layer metadata comming from the store 
  },

  _onCreated: function(id) {
    ArcgisLayerActions.layerAdded(id);
  },

  _onServiceCreated: function(id) {
    ArcgisLayerActions.serviceCreated(id);
  },

  _getMap: function() {
    return this.props.getMap();
  },

  _getService: function() {
    return this.props.service;
  },

  _getLayer: function() {
    return this.props.layer;
  },

  _getVisibleIds: function(layers) {
    return layers_.findWhere({
      defaultVisibility: true
    }).map(function(l) {
      return l.id
    });
  },

  _loadLayers: function(layers) {
     debugger;
    var newLayers = _.filter(layers,{created:undefined});
    newLayers.map(function(l) {
      if (l.type === "Feature Service") {
        this._createFeatureService(l);
      } else {
        var layerClass;
        if (l.type === "Map Service") {
          if (l.layer.singleFusedMapCache) {
            layerClass = TiledMapServerClass;
          } else {
            layerClass = MapSeverClass;
          }
        }
        if (l.type === "Image Service") {
          layerClass = TiledMapServerClass;
        }
        this._createLayer(layerClass, l);
      }

      this._onServiceCreated(l.id); //tell this service was processed 

    }.bind(this));
  },

  _createLayer: function(lClass, layer) {
    writeLog('_createLayer');
    var url = layer.url;
    var leafletLayer = API.createLefleatLayer(lClass, {}, url)
    this._addToList(leafletLayer, layer.id); //keep internal state 
    
    this._addLayer(leafletLayer); //add leaflet layer to map
    
    this._onCreated(layer.id); //TODO:mark it as created
  },

  _createFeatureService: function(layer) {
    var featureLayers = [];
    var baseURL = layer.url;
    //feature layer is an special case we need to redenr all the sub layers
    layer.layer.layers.map(function(layer) {
      var url = baseURL + (layer ? '/' + layer.id.toString() : '');
      var lLayer = API.createLefleatLayer(FeatureLayerClass, {}, url);
      // this._addLayer(lLayer); //map layer, feature layer, esri service 
      var title = layer.name;
      var obj = new Object();
      obj[title] = lLayer;
      featureLayers.push(obj);

    }.bind(this));

    this._onCreated(layer.id);
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.layers.length > this.state.layers.length) {
      this._loadLayers(nextState.layers);
    } else {
      this._updateLayers(nextState.layers)
    }
  },

  _updateLayers: function(layers) {        
    debugger;
    layers.map(function(l) {
      var leafletLayer = this.state.leafletLayers[l.id]; ///find layer by metadata id 
      if (!leafletLayer) {
        return;
      }
      //set leaflet layers properties from metadata values 
      leafletLayer.setOpacity(l.opacity);
      leafletLayer.setZIndex(l.zIndex);
      leafletLayer._update();
      if (l.visible) { //check if metadata is visible 
        this._addLayer(leafletLayer);
      } else {
        this._removeLayer(leafletLayer);
      }


    }.bind(this));
  },

  componentDidMount: function() {
    this._enableMapListeners();
    if (this.state.layers.length > 0) {
      this._loadLayers(); //load default layers
    }
  },

  componentWillUnmount: function() {
    var map = this._getMap();
    map
    .off('layeradd', this._onLayerChange)
    .off('layerremove', this._onLayerChange)
    .off('changeorder', this._onLayerChange);
  },

  _enableMapListeners: function() {
    var map = this._getMap();
    map
    .on('layeradd', this._onLayerChange, this)
    .on('layerremove', this._onLayerChange, this)
    .on('changeorder', this._onLayerChange, this);
  },


  _addLayer: function(layer) {
    writeLog('_addLayer');
    var map = this._getMap();
    if (!map.hasLayer(layer)) {
      map.addLayer(layer);
    }
    this._getMap().getContainer().focus();
  },

  _removeLayer: function(layer) {
    writeLog('_removeLayer');
    var map = this._getMap();
    if (map.hasLayer(layer)) {
      map.removeLayer(layer);
    }
    //  this._handlingClick = false;
  },

  _onLayerChange: function(e) {
    console.log('Layer Changed');

    var layers = _.values(this.state.leafletLayers)
    
    var obj = _.find(layers, function(l) {
      return L.stamp(l) == L.stamp(e.layer)
    })

    if (!obj) {
      return;
    }
    if (!this._handlingClick) {
      //this._update();
    }

    var type = obj.overlay ?(e.type === 'layeradd' ? 'overlayadd' : 'overlayremove') :(e.type === 'layeradd' ? 'baselayerchange' : null);

    if (type) {
      this._getMap().fire(type, obj);
    }

  },

  render: function() {
    return null;
  }

});