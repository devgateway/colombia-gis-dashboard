'use strict';
var _ = require('lodash');
var assign = require('object-assign');
var Reflux = require('reflux');
var SaveActions = require('../actions/saveActions.js');
var LayersActions = require('../actions/layersAction.js');
var LanStore = require('./lanStore.js');
var ShapesLayerStore = require('./shapesLayerStore.js');
var PointsLayerStore = require('./pointsLayerStore.js');
var ArcgisLayerStore = require('./arcgisLayerStore.js');

var lanState;
var shapesState;
var pointsState;
var arcgisState;

module.exports = Reflux.createStore({

  listenables: SaveActions,

  init: function() {
    this.state = {}; 
    this.listenTo(LanStore, this._handleLanDataUpdate);
    this.listenTo(ShapesLayerStore, this._handleShapesDataUpdate); 
    this.listenTo(PointsLayerStore, this._handlePointsDataUpdate); 
    this.listenTo(ArcgisLayerStore, this._handleArcgisDataUpdate); 
  },

  onSaveMap:function(){
   console.log('stores->saveStore->onSaveMap');
   //Fix for esriLayers
   var lanData = this._getDataFromState(lanState);
   var shapesData = this._getDataFromState(shapesState);
   var pointsData = this._getDataFromState(pointsState);
   var arcgisData = this._getDataFromState(arcgisState);

   this.update({
        'lanState': lanData,
        'shapesState': shapesData,
        'pointsState': pointsData,
        'arcgisState': arcgisData
      }, {'silent': true});
   var dataToSave = JSON.stringify(this.state);
   //post dataToSave
  },

  _getDataFromState(stateVar){
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
    if(this.state){
      LanStore.setCurrentState(this.state.lanState);
      if(this.state.shapesState){
        LayersActions.restoreData(_.clone(this.state.shapesState, true), 'shapes');
      }
      if(this.state.pointsState){
        LayersActions.restoreData(_.clone(this.state.pointsState, true), 'points');
      }
      ArcgisLayerStore.setCurrentState(this.state.arcgisState);
    }
  },

  update: function(assignable, options) {
    options = options || {};
    this.state = assign(this.state, assignable);
    if (!options.silent) {
      this.trigger(this.state);
    }
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