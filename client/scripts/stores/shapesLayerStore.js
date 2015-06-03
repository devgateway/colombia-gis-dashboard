'use strict';

var Reflux = require('reflux');
var LayersAction = require('../actions/layersAction.js');
var Util = require('../api/util.js');
var API = require('../api/layers.js');

var _ = require('lodash');
var assign = require('object-assign');

var CommonsMixins = require('./_mixins.js')
var DataLayerMixins = require('./_overlaysMixins.js')

//var departmentsGeoJson = require('./data/_departmentsGeo.js');

//var municipalitiesGeoJson = require('./data/_municipalitiesGeo.js');


var defaultStyle = {
	"color": "#FFFFFF",
	"weight": 1,
	"opacity": 1,
	'fillOpacity': 0.9
};
var over = {
	"color": "#FFFFFF",
	"weight": 1
};

var defaultBreaks = {
	'Level0': {
		
		'value': 20,
		'style': _.assign(_.clone(defaultStyle), {
			'color': '#FFAAAA',
			'over': _.assign(_.clone(over), {
				'color': '#8A4A4A'
			})
		}),

	},

	'Level1': {
		'value': 40,
		'style': _.assign(_.clone(defaultStyle), {
			'color': '#D46A6A',
			'over': _.assign(_.clone(over), {
				'color': '#8A4A4A'
			})
		}),
	},

	'Level2': {
		'value': 60,
		'style': _.assign(_.clone(defaultStyle), {
			'color': '#AA3939',
			'over': _.assign(_.clone(over), {
				'color': '#8A4A4A'
			})
		})
	},

	'Level3': {
		'value': 80,
		'style': _.assign(_.clone(defaultStyle), {
			'color': '#801515',
			'over': _.assign(_.clone(over), {
				'color': '#8A4A4A'
			})
		})
	},

	'Level4': {
		'value': 100,
		'style': _.assign(_.clone(defaultStyle), {
			'color': '#550000',
			"over": _.assign(_.clone(over), {
				'color': '#8A4A4A'
			})
		})
	}
}

module.exports = Reflux.createStore({


	mixins: [CommonsMixins, DataLayerMixins],

	_getLayerId: function() {
		return 'shapes';
	},

	getInitialState: function() {
		return this.state = this.storedState || _.assign(_.clone(this._getDefState()), {
			level: "departament",
			visible: false,
			breaks: defaultBreaks, //defaul styles breaks
			defaultStyle: defaultStyle //Default symbol styles
		});


	},

	_loadByMuncipalities: function() {
		//var geoData = _.clone(municipalitiesGeoJson);
		var self = this;
		API.getActivitiesByMuncipalities(this.state.filters).then(
			function(data) {
				API.loadMunicipalitiesShapes().then(
					function(geoData) {
						_.map(data, function(d) {
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
						self._setGeoData(geoData);
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
						_.map(data, function(d) {
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
					self._setGeoData(geoData);
				});
			}.bind(this)).fail(function() {
			console.log('Error loading data ...');
		});
	},

	_enableLoading: function() {
		console.log('_enableLoading');
		this.state = assign(this.state, {loading:true});
		this.trigger(this.state);
	},

	_disableLoading: function() {
		console.log('_disableLoading');
		this.state = assign(this.state, {loading:false});
		this.trigger(this.state);
	}

});