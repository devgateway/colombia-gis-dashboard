'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Util = require('../api/util.js');
var API = require('../api/layers.js');
var CommonsMixins = require('./_mixins.js')
var DataLayerMixins = require('./_overlaysMixins.js')
var LegendActions = require('../actions/legendActions.js');


var defaultStyle = {
  "color": "#FFFFFF",
  "weight": 1,
  "opacity": 1,
  'fillOpacity': 0.9
};

var defaultBreaks = {
  'Level0': {
    'min': 0,
    'max': 20,
    'style': _.assign(_.clone(defaultStyle), {
      'color': '#FFAAAA'
    }),
  },
  'Level1': {
    'min': 21, //min <= X , max
    'max': 40,
    'style': _.assign(_.clone(defaultStyle), {
      'color': '#D46A6A'
    }),
  },
  'Level2': {
    'min': 41,
    'max': 60,
    'style': _.assign(_.clone(defaultStyle), {
      'color': '#AA3939'
    })
  },
  'Level3': {
    'min': 61,
    'max': 80,
    'style': _.assign(_.clone(defaultStyle), {
      'color': '#801515'
    })
  },
  'Level4': {
    'min': 81,
    'max': 101,
    'style': _.assign(_.clone(defaultStyle), {
      'color': '#550000'
    })
  }
};

module.exports = Reflux.createStore({


  mixins: [CommonsMixins, DataLayerMixins],
  _getLayerId: function() {
    return 'points';
  },

  onActivityLayerInit: function() {
    this._load(null,this.state.level, true); //initialize data 
  },



  getInitialState: function() {
    return this.state = this.storedState ||
      _.assign(_.clone(this._getDefState()) /*Get default values*/ , {
        level: "departament",
        breaks: defaultBreaks, //defaul styles breaks
        defaultStyle: defaultStyle //Default symbol styles
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
      LegendActions.getBaseMapLegends(); 
    }.bind(this)).fail(function(e) {
      console.log('Error while loading data ...', e);
    });
  },


});