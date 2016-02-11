'use strict';

var Reflux = require('reflux');
var Util = require('../api/util.js');
var API = require('../api/layers.js');
var LayersAction = require('../actions/layersAction.js');
var LoadingAction = require('../actions/loadingActions.js');
var RestoreActions = require('../actions/restoreActions.js');
var _ = require('lodash');
var assign = require('object-assign');

var CommonsMixins = require('./_mixins.js');
var DataLayerMixins = require('./_overlaysMixins.js');
var IndicatorsFinderStore = require('./indicatorsFinderStore.js');
var GeoStats = require('../api/geostats.js');


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


var defaultBreaks = {
	'symbol':{'symbol':{width:10, type:'esriSMS', style:'esriSMSSquare'}},
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
};

module.exports = Reflux.createStore({

	listenables: [LayersAction, RestoreActions],
	mixins: [CommonsMixins, DataLayerMixins],

	init: function() {		
		this.listenTo(IndicatorsFinderStore, '_indicatorSelected');
	},

	_getLayerId: function() {
		return 'indicators';
	},

	_getTitle:function(){
		return 'layers.indicatorTitle';
	},

	_getSubtitle:function(){
		return this.state && this.state.subtitle?this.state.subtitle:'layers.indicatorDepartmentSubtitle';
	},

	_getDefaultBreaks: function() {
		return defaultBreaks;
	},

	_indicatorSelected: function(data) {
		if (data.indicatorSelected.id && this.state.layerFilters.indicatorId != data.indicatorSelected.id){
			this.onChangeGroupFilterSelection('indicators', [
				{'param': 'indicatorId', 'values': data.indicatorSelected.id},
				{'param': 'indicatorName', 'values': data.indicatorSelected.description},
				{'param': 'activityId', 'values': data.activitySelected},
				{'param': 'fyi', 'values': '2010'},
				{'param': 'sq', 'values': '1'},
				{'param': 'fyf', 'values': '2016'},
				{'param': 'eq', 'values': '1'}
			], 'indicators');
			//this.update({'visible': true});
			LayersAction.changeLayerValue('indicators', 'visible', true);
		}
	},

	onChangeGroupFilterSelection: function(layerId, filters) {
		if (layerId === this._getLayerId()){
			_.forEach(filters, function(filter){
				this.onChangeFilterSelection(layerId, filter.param, filter.values, true);
			}.bind(this));
			this._applyLayerFilters(this.state.layerFilters, 'indicators');
		}
	},

	onChangeFilterSelection: function(layerId, param, value, silent) {
		if (layerId === this._getLayerId()){
			var filters=_.clone(this.state.layerFilters || []);
		    filters[param] = value;
		    _.assign(this.state.layerFilters,filters);
		    if (!silent){
		    	this._applyLayerFilters(filters, 'indicators');
		    }
		}
	},

	onRestoreData: function(savedData) {
		if(savedData.indicatorsState && savedData.indicatorsState.visible){
			this.update({
		   		'dataToRestore': savedData.indicatorsState,
		   		'isRestorePending': true, 
		   		'layerFilters':savedData.indicatorsState.layerFilters});
		   this._loadIndicatorsGeoData(savedData.indicatorsState.level); //restore data
		} else {
			this.update({'visible':false});
		}
	},

	getInitialState: function() {
		return this.state = this.storedState || _.assign(_.clone(this._getDefState()), {
			level: 'departament',
			visible: false,
			breaks: defaultBreaks, //defaul styles breaks
			defaultStyle: defaultStyle, //Default symbol styles
			saveItems: ['breaks', 'defaultStyle', 'level', 'opacity', 'visible', 'layerFilters'],
			layerFilters:  
				{'indicatorId': '',
				'activityId': '',
				'fyi': '2010',
				'sq': '1',
				'fyf': '2016',
				'eq': '1'}
		});
	},

	/*Load GIS data by level*/
	_loadIndicatorsGeoData: function(newLevel) {
		LoadingAction.showLoading();
		if (newLevel === 'departament') {
			this._loadBy_Departments(); //load data 
		} else if (newLevel === 'municipality') {
			this._loadBy_Muncipalities();
		} else if (newLevel === 'country') {
			this._loadBy_Country();
		}
	},

	_applyLayerFilters: function(data, specialTriggerFrom) {
		this.update({layerFilters: data}, {silent: true});
		this._loadIndicatorsGeoData(this.state.level); //force re-load;
	},

	_loadBy_Muncipalities: function() {
		//var geoData = _.clone(municipalitiesGeoJson);
		this.update({subtitle:'layers.indicatorMunicipalitySubtitle'});
		var self = this;
		API.getIndicatorsByMuncipalities(this.state.layerFilters).then(
			function(data) {
				API.loadMunicipalitiesShapes().then(
					function(geoData) {
						var items = [];
						_.map(data, function(d) {
							if(!isNaN(d.idMun)){
								items.push(d.value);
							}							
							var feature = _.find(geoData.features, function(e) {
								return e.properties.ID_2 == d.idMun; //replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name
							});
							if (feature) {
								_.assign(d, {'id': d.idMun}); //overwrite indicatorId with locationId
								_.assign(feature, {'hasValue': true}); //indicate that the feature has valid values
								_.assign(feature.properties, _.omit(_.clone(d), 'name')); //set feature values	
							}
						});
						if (items.length===0){
					        LayersAction.showNoResultsPopup('layers.noResultsForDataLayerMessage');   
					    }	
						var geoDataFeaturesValid = _.filter(geoData.features, {'hasValue': true});
						_.assign(geoData, {'features': geoDataFeaturesValid});
						var geoStats = new GeoStats(items);
						self._setGeoData(geoData, geoStats);
					});							
			}.bind(this)).fail(function() {
			console.log('Error loading data ...');
		});
	},


	_loadBy_Departments: function() {
		//var geoData = _.clone(departmentsGeoJson);
		this.update({subtitle:'layers.indicatorDepartmentSubtitle'});
		var self = this;
		API.getIndicatorsByDepartment(this.state.layerFilters).then(
			function(data) {
				var items = [];
				API.loadDepartmentsShapes().then(
					function(geoData) {
						_.map(data, function(d) {
							if(!isNaN(d.id)){
								items.push(d.value);
							}
							var feature = _.find(geoData.features, function(e) {
								return e.properties.ID == d.idDep; //replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name
							});
							if (feature) {
								_.assign(d, {'id': d.idDep}); //overwrite indicatorId with locationId
								_.assign(feature, {'hasValue': true}); //indicate that the feature has valid values
								_.assign(feature.properties, _.omit(_.clone(d), 'name')); //set feature values
							}
						});
						if (items.length===0){
					        LayersAction.showNoResultsPopup('layers.noResultsForDataLayerMessage');   
					    }
						var geoDataFeaturesValid = _.filter(geoData.features, {'hasValue': true});
						_.assign(geoData, {'features': geoDataFeaturesValid});
						var geoStats = new GeoStats(items);
						self._setGeoData(geoData, geoStats);
					});				
			}.bind(this)).fail(function() {
			console.log('Error loading data ...');
		});
	},


	_loadBy_Country: function() {
		//var geoData = _.clone(departmentsGeoJson);
		this.update({subtitle:'layers.indicatorDepartmentSubtitle'});
		var self = this;
		API.getIndicatorsByDepartment(this.state.layerFilters).then(
			function(data) {
				var items = [];
				API.loadCountryShape().then(
					function(geoData) {						
						_.map(data, function(d) {
							if (d.idDep=='CN'){
								if(!isNaN(d.id)){
									items.push(d.value);
								}
								var feature = geoData.features[0];
								if (feature) {
									_.assign(d, {'id': d.idDep}); //overwrite indicatorId with locationId
									_.assign(feature, {'hasValue': true}); //indicate that the feature has valid values
									_.assign(feature.properties, _.omit(_.clone(d), 'name')); //set feature values
								}
							}
						});
						if (items.length===0){
					        LayersAction.showNoResultsPopup('layers.noResultsForDataLayerMessage');
					    }	
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