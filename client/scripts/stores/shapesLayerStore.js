'use strict';

var Reflux = require('reflux');
var Util = require('../api/util.js');
var API = require('../api/layers.js');
var GeoStats = require('../api/geostats.js');
var LayersAction = require('../actions/layersAction.js');
var RestoreActions = require('../actions/restoreActions.js');
var _ = require('lodash');
var assign = require('object-assign');

var CommonsMixins = require('./_mixins.js');
var DataLayerMixins = require('./_overlaysMixins.js');

var defaultStyle = {
	'color': {
		r: 255,
		g: 255,
		b: 255,
		a: 0
	},
	'weight': 1,
	'opacity': 1,
	'fillOpacity': 0.9
};


/*. The range of the break is greater than or equal to the minimum value and less than the maximum value.*/

var defaultBreaks = {
	'symbol':{'symbol':{width:10, type:'esriSMS', style:'esriSMSSquare'}},
	'field': ' - Funding',
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
};

module.exports = Reflux.createStore({

	listenables: [LayersAction, RestoreActions],
	mixins: [CommonsMixins, DataLayerMixins],

	_getLayerId: function() {
		return 'shapes';
	},

	_getTitle:function(){
		return 'layers.fundingByTypeTitle';
	},
	
	_getSubtitle:function(){
		return this.state && this.state.subtitle?this.state.subtitle:'layers.fundingByTypeDepartmentSubtitle';
	},

	_getDefaultBreaks: function() {
		return defaultBreaks;
	},

	onLayerInit: function() {
		this._loadFundingFilter();
	},

	onRestoreData: function(savedData) {
		if(savedData.shapesState){
		   this.update({dataToRestore: savedData.shapesState, isRestorePending: true, filters:savedData.shapesState.filters});
		   this._load(savedData.shapesState.level); //restore data
		} else {
			this.update({'visible':false});
		}
	},
	
	onChangeGroupFilterSelection: function(layerId, filters) {
		if (layerId === this._getLayerId()){
			_.forEach(filters, function(filter){
				this.onChangeFilterSelection(layerId, filter.param, filter.values, true);
			}.bind(this));
			this._applyFilters(filters, 'shapes');
		}
	},

	onChangeFilterSelection: function(layerId, param, value, silent) {
		if (layerId === this._getLayerId()){
			var filters=_.clone(this.state.filters || []);
		    value = Array.isArray(value)? value : [value]; //'values' in query should be an array
		    var filter = _.find(filters, {'param': param});
		    if (filter){
		      filter.values = value;
		    } else {
		      filters.push({'param': param, 'values': value});
		    }
		    _.assign(this.state.filters,filters);
		    //this.update({'filters': filters}, {'silent': true});
		    if (!silent){
		    	this._applyFilters(filters, 'shapes');
		    }
		}
	},

	getInitialState: function() {
		return this.state = this.storedState || _.assign(_.clone(this._getDefState()), {
			level: 'departament',
			subtitle:'layers.fundingByTypeDepartmentSubtitle',
			fundingType: 'commitments',
			visible: false,
			breaks: defaultBreaks, //defaul styles breaks
			defaultStyle: defaultStyle, //Default symbol styles
			saveItems: ['breaks', 'defaultStyle', 'level', 'opacity', 'visible', 'filters']
		});
	},

	_loadFundingFilter: function() {
		Util.get(window.LIST_SOURCE_FUNDINGTYPE).then(function(data) {
			this.update({fundingSourceItems: data});
		}.bind(this)).fail(function() {
			console.log('Failed to load data ');
		});
	},

	
	_loadByMuncipalities: function() {
		//var geoData = _.clone(municipalitiesGeoJson);
		this.update({subtitle:'layers.fundingByTypeMunicipalitySubtitle'});
		var self = this;
		API.getActivitiesByMuncipalities(this.state.filters).then(
			function(data) {
				API.loadMunicipalitiesShapes().then(
					function(geoData) {
						var items = [];
						_.map(data, function(d) {
							if(!isNaN(d.id)){
								items.push(d.fundingUS);
							}							
							var feature = _.find(geoData.features, function(e) {
								//if (e.properties.ID_2 == d.id /*replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name*/ ) {
								//	console.log('Found!');
								//}
								return e.properties.ID_2 == d.id; //replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name
							});
							if (feature) {
								_.assign(feature, {'hasValue': true}); //indicate that the feature has valid values
								_.assign(feature.properties, _.omit(_.clone(d), 'name')); //set feature values	
							}
						});
						var geoDataFeaturesValid = _.filter(geoData.features, {'hasValue': true});
						_.assign(geoData, {'features': geoDataFeaturesValid});
						var geoStats = new GeoStats(items);
						self._setGeoData(geoData, geoStats);
					});

		}.bind(this)).fail(function() {
			console.log('Error loading data ...');
		});
	},


	_loadByDepartments: function() {
		this.update({subtitle:'layers.fundingByTypeDepartmentSubtitle'});
		//var geoData = _.clone(departmentsGeoJson);
		var self = this;
		API.getActivitiesByDepartment(this.state.filters).then(
			function(data) {
				API.loadDepartmentsShapes().then(
					function(geoData) {
						var items = [];
						_.map(data, function(d) {
							if(!isNaN(d.id)){
								items.push(d.fundingUS);
							}
							var feature = _.find(geoData.features, function(e) {
								if (e.properties.ID == d.id /*replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name*/ ) {
									console.log('Found!');
								}
								return e.properties.ID == d.id; //replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name
							});
							if (feature) {
								_.assign(feature, {'hasValue': true}); //indicate that the feature has valid values
								_.assign(feature.properties, _.omit(_.clone(d), 'name')); //set feature values
							}
						});
						var geoDataFeaturesValid = _.filter(geoData.features, {'hasValue': true});
						_.assign(geoData, {'features': geoDataFeaturesValid});
						var geoStats = new GeoStats(items);
						self._setGeoData(geoData, geoStats);
					});
			}.bind(this)).fail(function() {
				console.log('Error loading data ...');
			});
		}

	});
