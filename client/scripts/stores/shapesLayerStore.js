'use strict';

var Reflux = require('reflux');
var LayersAction = require('../actions/layersAction.js');
var Util = require('../api/util.js');
var API = require('../api/layers.js');

var _ = require('lodash');
var assign = require('object-assign');

var CommonsMixins = require('./_mixins.js')
var DataLayerMixins = require('./_overlaysMixins.js')

var departmentsGeoJson = require('./data/_departmentsGeo.js');

var municipalitiesGeoJson = require('./data/_municipalitiesGeo.js');


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
		'min': 0,
		'max': 20,
		'style': _.assign(_.clone(defaultStyle), {
			'color': '#FFAAAA',
			'over': _.assign(_.clone(over), {
				'color': '#8A4A4A'
			})
		}),

	},

	'Level1': {
		'min': 21, //min <= X , max
		'max': 40,
		'style': _.assign(_.clone(defaultStyle), {
			'color': '#D46A6A',
			'over': _.assign(_.clone(over), {
				'color': '#8A4A4A'
			})
		}),
	},

	'Level2': {
		'min': 41,
		'max': 60,
		'style': _.assign(_.clone(defaultStyle), {
			'color': '#AA3939',
			'over': _.assign(_.clone(over), {
				'color': '#8A4A4A'
			})
		})
	},

	'Level3': {
		'min': 61,
		'max': 80,
		'style': _.assign(_.clone(defaultStyle), {
			'color': '#801515',
			'over': _.assign(_.clone(over), {
				'color': '#8A4A4A'
			})
		})
	},

	'Level4': {
		'min': 81,
		'max': 101,
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
		var geoData = _.clone(municipalitiesGeoJson);
		API.getActivitiesByMuncipalities(this.state.filters).then(
			function(data) {
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

				this._setGeoData(geoData);

			}.bind(this)).fail(function() {
			console.log('Error loading data ...');
		});
	},


	_loadByDepartments: function() {
		var geoData = _.clone(departmentsGeoJson);
		API.getActivitiesByDepartment(this.state.filters).then(
			function(data) {
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

				this._setGeoData(geoData);

			}.bind(this)).fail(function() {
			console.log('Error loading data ...');
		});
	},


});