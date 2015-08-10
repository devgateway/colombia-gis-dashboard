'use strict';

var Reflux = require('reflux');
var LayersAction = require('../actions/layersAction.js');
var Util = require('../api/util.js');
var API = require('../api/layers.js');

var _ = require('lodash');
var assign = require('object-assign');

var CommonsMixins = require('./_mixins.js')
var DataLayerMixins = require('./_overlaysMixins.js')
var IndicatorsFinderStore = require('./indicatorsFinderStore.js')
var GeoStats = require('../api/geostats.js');


var defaultStyle = {
	"color": {
		r: 255,
		g: 255,
		b: 255,
		a: 0
	},
	"weight": 1,
	"opacity": 1,
	'fillOpacity': 0.9
};


var defaultBreaks = {
	'field': 'Progress',
	breaks: {
		'Level0': {
			'min': 0,
			'max': 20,
			'style': _.assign(_.clone(defaultStyle), {
				color: {
					r: 255,
					g: 200,
					b: 170,
					a: 0.8
				}

			}),
		},
		'Level1': {
			'min': 20,
			'max': 40,
			'style': _.assign(_.clone(defaultStyle), {
				color: {
					r: 212,
					g: 143,
					b: 106,
					a: 0.8
				}

			}),
		},

		'Level2': {
			'min': 40,
			'max': 60,

			'style': _.assign(_.clone(defaultStyle), {
				color: {
					r: 253,
					g: 154,
					b: 0,
					a: 0.8
				}

			})
		},

		'Level3': {
			'min': 60,
			'max': 80,

			'style': _.assign(_.clone(defaultStyle), {
				color: {
					r: 170,
					g: 57,
					b: 0,
					a: 0.8
				}

			})
		},

		'Level4': {
			'min': 80,
			'max': 100,
			'style': _.assign(_.clone(defaultStyle), {
				color: {
					r: 128,
					g: 58,
					b: 21,
					a: 0.8
				}

			})
		}
	}
}
module.exports = Reflux.createStore({

	mixins: [CommonsMixins, DataLayerMixins],

	init: function() {		
		this.listenTo(IndicatorsFinderStore, "_indicatorSelected");
	},

	_getLayerId: function() {
		return 'indicators';
	},

	_getDefaultBreaks: function() {
		return defaultBreaks;
	},

	_indicatorSelected: function(data) {
		if (this.state.indicatorId != data.indicatorSelected){
			this.onChangeGroupFilterSelection([
				{"param": "indicatorId", "values": data.indicatorSelected},
				{"param": "activityId", "values": data.activitySelected}
			], "indicators");
		}
	},

	onChangeGroupFilterSelection: function(filters) {
		_.forEach(filters, function(filter){
			this.onChangeFilterSelection(filter.param, filter.values, true);
		}.bind(this));
		this._applyFilters(this.state.filters, "indicators");
	},

	onChangeFilterSelection: function(param, value, silent) {
		var filters=_.clone(this.state.filters || []);
	    filters[param] = value;
	    _.assign(this.state.filters,filters);
	    if (!silent){
	    	this._applyFilters(filters, "indicators");
	    }
	},

	onRestoreData: function(data, type) {
		//alert('_onRestoreData');
	},

	getInitialState: function() {
		return this.state = this.storedState || _.assign(_.clone(this._getDefState()), {
			level: "departament",
			visible: false,
			breaks: defaultBreaks, //defaul styles breaks
			defaultStyle: defaultStyle, //Default symbol styles
			saveItems: ["breaks", "defaultStyle", "level", "opacity", "visible"],
			filters:  
				{"indicatorId": "",
				"activityId": "",
				"fyi": "2005",
				"qi": "1",
				"fyf": "2016",
				"qf": "1"}
		});
	},


	_loadByMuncipalities: function() {
		//var geoData = _.clone(municipalitiesGeoJson);
		var self = this;
		API.getIndicatorsByMuncipalities(this.state.filters).then(
			function(data) {
				API.loadMunicipalitiesShapes().then(
					function(geoData) {
						var items = [];
						_.map(data, function(d) {
							if(!isNaN(d.id)){
								items.push(d.activities);
							}							
							var feature = _.find(geoData.features, function(e) {
								//if (e.properties.ID_2 == d.id /*replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name*/ ) {
								//	console.log('Found!');
								//}
								return e.properties.ID_2 == d.id; //replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name
							});
							if (feature) {
								_.assign(feature.properties, _.omit(_.clone(d), "name")); //set feature values	
							}
						});
						var geoStats = new GeoStats(items);
						self._setGeoData(geoData, geoStats);
					});

		}.bind(this)).fail(function() {
			console.log('Error loading data ...');
		});
	},


	_loadByDepartments: function() {
		//var geoData = _.clone(departmentsGeoJson);
		var self = this;
		API.getIndicatorsByDepartment(this.state.filters).then(
			function(data) {
				API.loadDepartmentsShapes().then(
					function(geoData) {
						var items = [];
						_.map(data, function(d) {
							if(!isNaN(d.id)){
								items.push(d.activities);
							}
							var feature = _.find(geoData.features, function(e) {
								if (e.properties.ID == d.id /*replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name*/ ) {
									console.log('Found!');
								}
								return e.properties.ID == d.id; //replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name
							});
							if (feature) {
								_.assign(feature.properties, _.omit(_.clone(d), "name")); //set feature values
							}
						});
						var geoStats = new GeoStats(items);
						self._setGeoData(geoData, geoStats);
					});
			}.bind(this)).fail(function() {
				console.log('Error loading data ...');
			});
		}
	/*
	_loadByDepartments: function() {
		this._getGeoData(API.getIndicatorsByDepartment); //just delegate the call to the next function passing the target method
	},

	_loadByMuncipalities: function() {
		this._getGeoData(API.getIndicatorsByMuncipalities); //just delegate the call to the next function passing the target method
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
	*/
});