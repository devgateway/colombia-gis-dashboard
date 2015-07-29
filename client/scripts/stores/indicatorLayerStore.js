'use strict';

var Reflux = require('reflux');
var LayersAction = require('../actions/layersAction.js');
var Util = require('../api/util.js');
var API = require('../api/layers.js');

var _ = require('lodash');
var assign = require('object-assign');

var CommonsMixins = require('./_mixins.js')
var DataLayerMixins = require('./_overlaysMixins.js')
var GeoStats = require('../api/geostats.js');


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
		return 'indicators';
	},

	_getDefaultBreaks: function() {
		return defaultBreaks;
	},

	onRestoreData: function(data, type) {
		///alert('_onRestoreData');
	},

	getInitialState: function() {
		return this.state = this.storedState || _.assign(_.clone(this._getDefState()), {
			level: "departament",
			visible: false,
			breaks: defaultBreaks, //defaul styles breaks
			defaultStyle: defaultStyle, //Default symbol styles
			saveItems: ["breaks", "defaultStyle", "level", "opacity", "visible"]
		});
	},

	/*Load GIS data by department */
	_loadByDepartments: function() {
		debugger;
    this._getGeoData(API.getActivitiesByDepartment); //just delegate the call to the next function passing the target method
},

_loadByMuncipalities: function() {
	debugger;
    this._getGeoData(API.getActivitiesByMuncipalities); //just delegate the call to the next function passing the target method
},

_getGeoData: function(func) {
    func(this.state.filters).then(function(results) { //call api function and process results 
    	var items = [];
    	_.map(results, function(d){
    		if(!isNaN(d.id)){
    			items.push(d.activities);
    		}
    	});
    	var geoStats = new GeoStats(items);
      //tranform plain data to GeoJson
      this._setGeoData(Util.toGeoJson(results), geoStats); //process and set changes to state  
  }.bind(this)).fail(function(e) {
  	console.log('Error while loading data ...', e);
  });
}

});