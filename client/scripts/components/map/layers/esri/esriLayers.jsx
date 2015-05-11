'use strict';
var API = require('../../../../api/esri.js');
var React = require('react');
var Reflux = require('reflux');
var ArcgisLayerStore = require('../../../../stores/arcgisLayerStore.js')
var ArcgisLayerActions = require('../../../../actions/arcgisLayersActions.js')
var FeatureLayerClass = L.esri.featureLayer;
var MapSeverClass = L.esri.dynamicMapLayer;
var TiledMapServerClass = L.esri.tiledMapLayer;
var ImageServerClass = L.esri.imageMapLayer;
var ObjectBuilder=require('../../../../api/objectBuilder.js')
var _ = require('lodash');


module.exports = React.createClass({

  //mixins: [Reflux.connect(ArcgisLayerStore, 'arcgis')],

  mixins: [Reflux.listenTo(ArcgisLayerStore,"_onStatusChange")],



  _onStatusChange: function(status) {
    var newState={layers:status.layers.slice(0)};
    if(newState.layers.length != this.state.layers.length ){
        //status has changed do update 
        this.setState(newState); //create a new array in order to isolate the state
      }
    },

    getInitialState:function(){
      return {layers:ArcgisLayerStore.getInitialState().layers.slice(0)}; //create a new array in order to isolate the state
    },

    _addToMap: function(theLeafletLayer) {
      theLeafletLayer.addTo(this._getMap());
    },


    /**/

    _onCreated:function(controlLayer){
      ArcgisLayerActions.layerAdded(controlLayer); 

    },



    _onServiceCreated:function(layerInfo){
     ArcgisLayerActions.serviceCreated(layerInfo);
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

  _loadLayers: function() {
    var visibleServices = _.filter(this.state.layers,{created:undefined});
    
    visibleServices.map(function(layerInfo) {
      if (layerInfo.type === "Feature Service") {
        this._createFeatureService(layerInfo);
      } else {
        var layerClass;
        if (layerInfo.type === "Map Service") {
          if (layerInfo.layer.singleFusedMapCache) {
            layerClass = TiledMapServerClass;
          } else {
            layerClass = MapSeverClass;
          }
        }
        if (layerInfo.type === "Image Service") {
          layerClass = TiledMapServerClass;
        }
        this._createLayer(layerClass,layerInfo);
      }

      this._onServiceCreated(layerInfo); //tell this service was processed 

    }.bind(this));
  },

  _createLayer: function(lClass,layerInfo) {

    var url = layerInfo.url;
     
    var layer=API.createLefleatLayer(lClass, {}, url)
    this._addToMap(layer); //add leaflet layer to map
    this._onCreated(ObjectBuilder.buildObject({type:'Layer','title':layerInfo.title,leafletLayer:layer})); //TODO:Make it better
  },

  _createFeatureService: function(layerInfo) {
    var featureLayers=[];
    var baseURL=layerInfo.url ;

    //feature layer is an special case we need to redenr all the sub layers
    layerInfo.layer.layers.map(function(layer) {

      var url = baseURL + (layer ? '/' + layer.id.toString() : '');
      var lLayer=API.createLefleatLayer(FeatureLayerClass, {}, url);

      this._addToMap(lLayer); //map layer, feature layer, esri service 
      var title=layer.name;
      var obj=new Object();
        obj[title]=lLayer;
      featureLayers.push(obj);

    }.bind(this));

    this._onCreated(ObjectBuilder.buildObject({type:'Group',title:layerInfo.title,layers:featureLayers}));
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.layers.length > 0 ) {
      this._loadLayers(); 
    }
  },

  componentDidMount: function() {
    if (this.state.layers.length > 0) {
      this._loadLayers(); //load default layers
    }
  },

  componentWillMount: function() {
  },

  componentWillReceiveProps: function() {
  },

  render: function() {
    return null;
  }

});