'use strict';

var Reflux = require('reflux');
var Util = require('../api/util.js');
var API = require('../api/layers.js');
var GeoStats = require('../api/geostats.js');

var _ = require('lodash');
var assign = require('object-assign');

var CommonsMixins = require('./_mixins.js')
var DataLayerMixins = require('./_overlaysMixins.js')


//var departmentsGeoJson = require('./data/_departmentsGeo.js');

//var municipalitiesGeoJson = require('./data/_municipalitiesGeo.js');

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


/*. The range of the break is greater than or equal to the minimum value and less than the maximum value.*/

var defaultBreaks = {
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
}
module.exports = Reflux.createStore({

	mixins: [CommonsMixins, DataLayerMixins],

	_getLayerId: function() {
		return 'shapes';
	},

	_getDefaultBreaks: function() {
		return defaultBreaks;
	},

	onLayerInit: function() {
		debugger
		console.log('Shape  layer onLayerInit');
		this._loadFundingFilter();
		this._load(null, this.state.level, true); //initialize data 
	},


	onRestoreData: function(savedData) {
		if(savedData.shapesState){
			this.update({dataToRestore: savedData.shapesState, isRestorePending: true});
		   this._load(null, savedData.shapesState.level, true); //restore data
		} else {
			this.update({'visible':false});
		}
	},
	


	onChangeFundingFilterSelection: function(id, selected) {
		var selectedList = this.state.fundingSelected? this.state.fundingSelected.slice(0) : [];
		if (selected){
			selectedList.push(id);
		} else {
			_.remove(selectedList, function(item) {
				return item == id;
			})
		}
		this.update({fundingSelected: selectedList});
		var filters = _.clone(this.state.filters || []);
		if (selectedList.length>0){
			var ftFilter = _.find(filters, {'param': 'ft'});
			if (ftFilter){
				_.assign(ftFilter, {'values': selectedList})
			} else {
				filters.push({'param': 'ft', 'values': selectedList});
			}
		} else {
			_.remove(filters, function(f) {return f.param=='ft';});
		}
		this._applyFilters(filters, true);
	},

	getInitialState: function() {
		return this.state = this.storedState || _.assign(_.clone(this._getDefState()), {
			level: "departament",
			visible: true,
			breaks: defaultBreaks, //defaul styles breaks
			defaultStyle: defaultStyle, //Default symbol styles
			saveItems: ["breaks", "defaultStyle", "level", "opacity", "visible"]
		});
	},

	_loadFundingFilter: function() {
		Util.get(window.DATA_PATH + '/fundingTypes.json').then(function(data) {
			this.update({fundingFilterItems: data});
		}.bind(this)).fail(function() {
			console.log('Failed to load data ');
		});
	},

	
	_loadByMuncipalities: function() {
		//var geoData = _.clone(municipalitiesGeoJson);
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
								if (e.properties.ID_2 == d.id /*replacer.replaceDiacritics(e.properties.NAME_1).toUpperCase()==d.name*/ ) {
									console.log('Found!');
								}
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

	});
