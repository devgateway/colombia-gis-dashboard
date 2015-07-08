'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Util = require('../api/util.js');
var API = require('../api/layers.js');
var CommonsMixins = require('./_mixins.js')
var DataLayerMixins = require('./_overlaysMixins.js')


var defaultStyle = {
  'color': {
    r: 253,
    g: 154,
    b: 0,
    a: 0.8
  },
  "weight": 1,
  "opacity": 1,
  'fillOpacity': 0.9
};

var defaultBreaks = {
  'field': 'activities',
  breaks: {
    'Level0': {
      'min': 0,
      'max': 20,
      'style': _.assign(_.clone(defaultStyle), {
      'radius': 20
      }),
    },
    'Level1': {
      'min': 20,
      'max': 45,
      'style': _.assign(_.clone(defaultStyle), {
        'radius': 30,
      }),
    },
    'Level2': {
      'min': 45,
      'max': 75,
      'style': _.assign(_.clone(defaultStyle), {

        'radius': 40,
      })
    },
    'Level3': {
      'min': 75,
      'max': 175,
      'style': _.assign(_.clone(defaultStyle), {

        'radius': 50,
      })
    },
    'Level4': {
      'min': 175,
      'max': 999,
      'style': _.assign(_.clone(defaultStyle), {

        'radius': 55,
      })
    }
  }
};


module.exports = Reflux.createStore({

  mixins: [CommonsMixins, DataLayerMixins],
  _getLayerId: function() {
    return 'points';
  },

  _getDefaultBreaks: function() {
    return defaultBreaks;
  },

  onActivityLayerInit: function() {
    this._load(null, this.state.level, true); //initialize data 
  },

  onRestoreData: function(savedData) {
    if(savedData.pointsState){
      if(!this.state.visible && savedData.pointsState.visible){
        this.update({'visible':true}); //Hack for changing colors
      }
       this.update({dataToRestore: savedData.pointsState, isRestorePending: true, filters: savedData.filterData.filters});
       this._load(null, savedData.pointsState.level, true); //restore data 
    } 
  },

  getInitialState: function() {
    return this.state = this.storedState ||
      _.assign(_.clone(this._getDefState()) /*Get default values*/ , {
        level: "departament",
        breaks: defaultBreaks, //defaul styles breaks
        defaultStyle: defaultStyle, //Default symbol styles
        saveItems: ["breaks", "defaultStyle", "level", "opacity", "visible"]
      }) /*override default values*/ ;
  },

  /*Load GIS data by department */
  _loadByDepartments: function() {
    this._getGeoData(API.getActivitiesByDepartment); //just delegate the call to the next function passing the target method
  },

  _loadByMuncipalities: function() {
    this._getGeoData(API.getActivitiesByMuncipalities); //just delegate the call to the next function passing the target method
  },

  _getGeoData: function(func) {
    func(this.state.filters).then(function(results) { //call api function and process results 
      //tranform plain data to GeoJson
      this._setGeoData(Util.toGeoJson(results)); //process and set changes to state  
    }.bind(this)).fail(function(e) {
      console.log('Error while loading data ...', e);
    });
  }


});