'use strict';
var _ = require('lodash');
var assign = require('object-assign');
var Reflux = require('reflux');
var SaveActions = require('../actions/saveActions.js');
var LayersActions = require('../actions/layersAction.js');
var RestoreActions = require('../actions/restoreActions.js');
var ArcgisLayersActions = require('../actions/arcgisLayersActions.js');
var LanStore = require('./lanStore.js');
var FilterStore = require('./filters/filterStore.js');
var MapStore = require('./mapStore.js');
var ShapesLayerStore = require('./shapesLayerStore.js');
var PointsLayerStore = require('./pointsLayerStore.js');
var ArcgisLayerStore = require('./arcgisLayerStore.js');
var API = require('../api/saveAndRestore.js');

var lanState;
var mapState;
var filterState;
var shapesState;
var pointsState;
var arcgisState;

module.exports = Reflux.createStore({

  listenables: SaveActions,

  init: function() {
    this.state = {}; 
    this.listenTo(LanStore, this._handleLanDataUpdate);
    this.listenTo(FilterStore, this._handleFilterDataUpdate); 
    this.listenTo(ShapesLayerStore, this._handleShapesDataUpdate); 
    this.listenTo(PointsLayerStore, this._handlePointsDataUpdate); 
    this.listenTo(ArcgisLayerStore, this._handleArcgisDataUpdate);
    this.listenTo(MapStore, this._handleMapDataUpdate);

  },

  onSaveMap:function(){
   console.log('stores->saveStore->onSaveMap');
   //Fix for esriLayers
   var mapData = this._getDataFromState(mapState);
   var lanData = this._getDataFromState(lanState);
   var filterData = {'filters': _.clone(filterState, true)};
   var shapesData = this._getDataFromState(shapesState);
   var pointsData = this._getDataFromState(pointsState);
   var arcgisData = this._getDataFromState(arcgisState);

   this.update({
        'mapState': mapData,
        'lanState': lanData,
        'filterData': filterData,
        'shapesState': shapesData,
        'pointsState': pointsData,
        'arcgisState': arcgisData
      }, {'silent': true});
   var dataToSave = JSON.stringify(this.state);
   //post dataToSave
    var params = JSON.stringify({Title:'SaveMap', Descriptions: 'Description', Tags:'Tag1,Tag2', Visibility: 'Public', User:'dashboard', Map:dataToSave });
    SaveActions.saveMapToAPI(params);
  },

  _getDataFromState:function(stateVar){
    var dataToSave = {};
    if(stateVar && stateVar.saveItems){
      stateVar.saveItems.map(function(l){
        var assignable = new Object(); 
        assignable[l] = _.clone(stateVar[l], true); 
        _.assign(dataToSave, assignable)
      });
    } else {
      dataToSave = null;
    }
    return dataToSave;
  },

  onRestoreMap:function(){
    console.log('stores->saveStore->onRestoreMap');
    SaveActions.restoreMapFromAPI('26');
  },

  onSaveMapToAPI:function(params){
    console.log("stores->saveStore: onSaveMapToAPI");
    API.saveMapToAPI(params).then(
      function(data){
        console.log("onSaveMapToAPI Completed");
      }).fail(function(){
        console.log('onSaveMapToAPI: Error saving data ...');
      });
  },

  onRestoreMapFromAPI:function(id){
    console.log("stores->saveStore: onRestoreMapFromAPI");
    API.restoreMapFromAPI(id).then(
      function(data){
        data.map(function(l){RestoreActions.restoreData(JSON.parse(l.Map))})
      }).fail(function(){
        console.log('onRestoreMapFromAPI: Error saving data ...');
      });
  },

  update: function(assignable, options) {
    options = options || {};
    this.state = assign(this.state, assignable);
    if (!options.silent) {
      this.trigger(this.state);
    }
  },

  _handleMapDataUpdate: function(data) {
    mapState = data;
  },

  _handleFilterDataUpdate: function(data) {
    filterState = data;
  },

  _handleLanDataUpdate: function(data) {
    lanState = data;
  },

  _handleShapesDataUpdate: function(data) {
    shapesState = data;
  },

  _handlePointsDataUpdate: function(data) {
    pointsState = data;
  },

  _handleArcgisDataUpdate: function(data) {
    arcgisState = data;
  },

  getInitialState: function() {
    return this.state;
  }

});