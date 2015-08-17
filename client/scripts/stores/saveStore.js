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
    this.state = {mapName : ''}; 
    this.listenTo(LanStore, this._handleLanDataUpdate);
    this.listenTo(FilterStore, this._handleFilterDataUpdate);
    this.listenTo(ShapesLayerStore, this._handleShapesDataUpdate);
    this.listenTo(PointsLayerStore, this._handlePointsDataUpdate);
    this.listenTo(ArcgisLayerStore, this._handleArcgisDataUpdate);
    this.listenTo(MapStore, this._handleMapDataUpdate);

  },

  onSaveMap: function(options) {
    console.log('stores->saveStore->onSaveMap');
    if(this._validateParamsForAPI(options, false)){
      var params = this._createParamsForAPI(options);
      this._saveMap(params);
    }
  },

  onUpdateMap: function(id, options) {
    console.log('stores->saveStore->onUpdateMap');
    if(this._validateParamsForAPI(options, true)){
      var params = this._createParamsForAPI(options);
      this._updateMap(id, params);
    }
  },

  onDeleteMap: function() {
    console.log('stores->saveStore->onDeleteMap');
    var self = this;
    var id = self.state.id;
    API.deleteMapToAPI(id).then(
      function(data) {
        this.onFindMaps(); //refresh map list
      }.bind(this)).fail(function(err) {
        self.update({
          'error': err
        });
        console.log('onDeleteMap: Error deleting data ...');
      });
    this.onShowDeleteModal(false);
  },

  _validateParamsForAPI: function(options, isUpdate) {
    var errorMsg = '';
    var isValid = true;
    if(options.title){
      if(!isUpdate && _.find(this.state.maps, function(m){return m.title==options.title})){
        errorMsg = 'savemap.titleIsDuplicated';
        isValid = false;
      } else if(options.title.length>100){
        errorMsg = 'savemap.mandatoryFieldsLength';
        isValid = false;
      }
    } else {
      errorMsg = 'savemap.mandatoryFieldsMissing';
      isValid = false;
    }

    if(!options.description){
      errorMsg = 'savemap.mandatoryFieldsMissing';
      isValid = false;
    } else if(options.description.length>300){
      errorMsg = 'savemap.mandatoryFieldsLength';
      isValid = false;
    }

    this.update({
      'errorMsg': errorMsg
    });
    return isValid;
  },

  _createParamsForAPI: function(options) {
    console.log('stores->saveStore->_createParamsForAPI');
    var mapData = this._getDataFromState(mapState);
    var lanData = this._getDataFromState(lanState);
    var filterData = {
      'filters': _.clone(filterState, true)
    };
    var shapesData = this._getDataFromState(shapesState);
    var pointsData = this._getDataFromState(pointsState);
    var arcgisData = this._getDataFromState(arcgisState);
    var tagArray = options.tags?options.tags.split(','):null;
    var params = {
      'title': options.title,
      'description': options.description,
      'tags': tagArray,
      'map': {
        'mapName': 'Saved Map for Colombia',
        'mapState': mapData,
        'lanState': lanData,
        'filterData': filterData,
        'shapesState': shapesData,
        'pointsState': pointsData,
        'arcgisState': arcgisData
      }
    }
    return(params);
  },

  _getDataFromState: function(stateVar) {
    var dataToSave = {};
    if (stateVar && stateVar.saveItems) {
      stateVar.saveItems.map(function(l) {
        var assignable = new Object();
        assignable[l] = _.clone(stateVar[l], true);
        _.assign(dataToSave, assignable)
      });
    } else {
      dataToSave = null;
    }
    return dataToSave;
  },

  onOpenMap: function(id) {
   this.onRestoreMapFromAPI(id);
  },

  _saveMap: function(params) {
    console.log("stores->saveStore: _saveMap");
    var self = this;
    API.saveMapToAPI(params).then(
      function(data) {
        this.onHideModal(); //tell save dialog that everything is done 
        this.onFindMaps(); //refresh map list

      }.bind(this)).fail(function(err) {
        self.update({
          'error': err
        });
        console.log('_saveMap: Error saving data ...');
      });
  },


  _updateMap: function(id, params) {
    console.log("stores->saveStore: _updateMap");
    var self = this;
    API.updateMapToAPI(id, params).then(
      function(data) {
        this.onHideModal(); //tell save dialog that everything is done 
        this.onFindMaps(); //refresh map list

      }.bind(this)).fail(function(err) {
        self.update({
          'error': err
        });
        console.log('_updateMap: Error saving data ...');
      });
  },

  onRestoreMapFromAPI: function(id) {
   console.log("stores->saveStore: onOpenMap"+id);
    API.getMapById(id).then(
      function(data) {
          RestoreActions.restoreData(data.map)
          ///this.update({map:data})
      }).fail(function() {
      console.log('onRestoreMapFromAPI: Error saving data ...');
    });
  },

  onFindMaps: function() {
    API.findMaps().then(
      function(data) {
        this.update({
          'maps': data
        });
      }.bind(this)).fail(function() {
        console.log('onRestoreMapFromAPI: Error saving data ...');
      });
    },

  onHideModal: function() {
    this.update({
      'showModal': false
    });
  },

  onShowModal: function(key, id) {
    this.update({
      'key': key,
      'id': id,
      'showModal': true,
      'errorMsg': ''
    });
  },

  onShowDeleteModal: function(isVisible, id) {
    this.update({
      'id': id,
      'showDeleteModal': isVisible
    });
  },

  update: function(assignable, options) {
    options = options || {};
    this.state = assign(this.state, assignable);
    if (!options.silent) {
      this.trigger(this.state);
    }
  },

  onFilterByKeyword: function(keyword){
    var noResults = true;
    _.forEach(this.state.maps, function(item){
      if (this._itemMatchs(item, keyword)){
        _.assign(item, {'hide': false});
        noResults = false;
      } else {
        _.assign(item, {'hide': true}); 
      }
    }.bind(this));
    if (noResults){
      this.update({'store': _.clone(this.state.store), 'noResults': true});
    } else {
      this.update({'store': _.clone(this.state.store), 'noResults': false});
    }
  },

  _itemMatchs: function(item, keyword) {

    if (keyword.length > 1) {
      var pattern = new RegExp(keyword, 'i');
      return pattern.test(item.title)  || pattern.test(item.description) || pattern.test(item.tags);
    } else {
      return true;
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