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
var IndicatorsLayerStore = require('./indicatorLayerStore.js');
var ShapesLayerStore = require('./shapesLayerStore.js');
var PointsLayerStore = require('./pointsLayerStore.js');
var ArcgisLayerStore = require('./arcgisLayerStore.js');
var API = require('../api/saveAndRestore.js');

var lanState;
var mapState;
var filterState;
var indicatorsState;
var shapesState;
var pointsState;
var arcgisState;

module.exports = Reflux.createStore({

  listenables: [LayersActions, SaveActions],

  init: function() {
    this.state = {mapName : '','layersVisible': {'indicators': false, 'points': true, 'shapes': false}};
    this.listenTo(LanStore, this._handleLanDataUpdate);
    this.listenTo(FilterStore, this._handleFilterDataUpdate);
    this.listenTo(IndicatorsLayerStore, this._handleIndicatorsDataUpdate);
    this.listenTo(ShapesLayerStore, this._handleShapesDataUpdate);
    this.listenTo(PointsLayerStore, this._handlePointsDataUpdate);
    this.listenTo(ArcgisLayerStore, this._handleArcgisDataUpdate);
    this.listenTo(MapStore, this._handleMapDataUpdate);

  },

  onChangeLayerValue: function(id, property, value, subProperty) {
    if (property == 'visible'){
      var layersVisible = _.clone(this.state.layersVisible);
      layersVisible[id] = value;
      this.update({'layersVisible': layersVisible});
    }
  },

  onExportActivities: function() {
    API.exportActivities(_.clone(filterState, true)).then(
      function(data) {        
        if (data[0] && data[0].name){
          this.onHideModal(); //tell save dialog that everything is done 
          location.href = data[0].name;
        } else {
          this.update({'error': 'savemap.exportError,'});        
        }
      }.bind(this)).fail(function(err) {
        this.update({'error': err});
        console.log('onExportActivities: Error on export data ...');
      }.bind(this));
  },

  onExportIndicators: function() {
    API.exportIndicators(_.clone(indicatorsState.filters, true)).then(
      function(data) {        
        this.onHideModal(); //tell save dialog that everything is done 
        window.open(data);
      }.bind(this)).fail(function(err) {
        this.update({
          'error': err
        });
        console.log('onExportIndicators: Error on export data ...');
      }.bind(this));
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
        errorMsg = errorMsg + 'savemap.titleIsDuplicated,';
        isValid = false;
      } else if(options.title.length>100){
        errorMsg = errorMsg + 'savemap.mandatoryTitleLength,';
        isValid = false;
      }
    } else {
      errorMsg = errorMsg + 'savemap.mandatoryTitleMissing,';
      isValid = false;
    }

    if(!options.description){
      errorMsg = errorMsg + 'savemap.mandatoryDescriptionMissing,';
      isValid = false;
    } else if(options.description.length>300){
      errorMsg = errorMsg + 'savemap.mandatoryDescriptionLength,';
      isValid = false;
    }

    var tagArray = options.tags && typeof options.tags == "string" ? options.tags.split(','):options.tags;
    if(tagArray){
      if(tagArray.length>3){
        errorMsg = errorMsg + 'savemap.tagsQuantity,';
        isValid = false;
      }
      var tagFlag = true;
      for(var i=0; i<tagArray.length && tagFlag; i++){
        if(tagArray[i].length>80){
          errorMsg = errorMsg + 'savemap.tagsLength,';
          tagFlag = false;
          isValid = false;
        }
      }
    }
    if (!isValid){
      this.update({
        'errorMsg': errorMsg,
        'map':{
          'title': options.title,
          'description': options.description,
          'tags': options.tags
        }
      });
    }
    return isValid;
  },

  _createParamsForAPI: function(options) {
    console.log('stores->saveStore->_createParamsForAPI');
    var mapData = this._getDataFromState(mapState);
    var lanData = this._getDataFromState(lanState);
    var filterData = {
      'filters': _.clone(filterState, true)
    };
    var indicatorsData = this._getDataFromState(indicatorsState);
    var shapesData = this._getDataFromState(shapesState);
    var pointsData = this._getDataFromState(pointsState);
    var arcgisData = this._getDataFromState(arcgisState);
    var tagArray = options.tags? _.isArray(options.tags)? options.tags : options.tags.trim().split(/\s*,\s*/):null;
    var params = {
      'title': options.title,
      'description': options.description,
      'version':options.version,
      'tags': tagArray,
      'map': {
        'mapName': 'Saved Map for Colombia',
        'mapState': mapData,
        'lanState': lanData,
        'filterData': filterData,
        'indicatorsState': indicatorsData,
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
        self.onHideModal(); //tell save dialog that everything is done 
        self.onFindMaps(); //refresh map list
        self.update({'mapName':data.title});
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
    var self=this;
    API.getMapById(id).then(
      function(data) {
          RestoreActions.restoreData(data.map);
          self.update({'mapName':data.title});  
          self.update({'mapDescription':data.description});

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
    this.update({'showModal': false, 'error': ''}); //close modal and reset errors
  },

  onShowModal: function(key, id) {
    var map = {};
    if (id){
      map = _.find(this.state.maps, function(l){return l._id==id});
    }
    this.update({
      'key': key,
      'id': id,
      'map': map,
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

  _handleIndicatorsDataUpdate: function(data) {
    var layersVisible = _.clone(this.state.layersVisible);
    layersVisible.indicators = data.visible;
    this.update({'layersVisible': layersVisible});
    indicatorsState = data;
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