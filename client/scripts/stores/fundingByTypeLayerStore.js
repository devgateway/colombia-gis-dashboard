'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var LayersAction = require('../actions/layersAction.js');
var Util = require('../api/util.js');
var API = require('../api/layers.js');
var departmentsGeoJson = require('./data/_departmentsGeo.js');

var _ = require('lodash');
var replacer = require('../api/replace-diacritics.js')

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
			'over':_.assign(_.clone(over), {'color': '#8A4A4A'})
		}),

	},

	'Level1': {
    'min': 21, //min <= X , max
    'max': 40,
    'style': _.assign(_.clone(defaultStyle), {
    	'color': '#D46A6A',
    	'over':_.assign(_.clone(over), {'color': '#8A4A4A'})
    }),
},

'Level2': {
	'min': 41,
	'max': 60,
	'style': _.assign(_.clone(defaultStyle), {
		'color': '#AA3939',
		'over':_.assign(_.clone(over), {'color': '#8A4A4A'})
	})
},

'Level3': {
	'min': 61,
	'max': 80,
	'style': _.assign(_.clone(defaultStyle), {
		'color': '#801515',
		'over':_.assign(_.clone(over), {'color': '#8A4A4A'})
	})
},

'Level4': {
	'min': 81,
	'max': 101,
	'style': _.assign(_.clone(defaultStyle), {
		'color': '#550000',
		"over":_.assign(_.clone(over), {'color': '#8A4A4A'})
	})
}
}

module.exports = Reflux.createStore({

	//listenables: LayersAction,

	onChangeLayerValue: function(property, value) {
		debugger;
		var assignable = new Object();
		assignable[property] = value;
		var options = {
			'silent': false
		};

    if ((property == "visible") && (value = true)) { //check if it is the first time the layer is loaded
    	if (!this.state.isLoaded) {
    		_.assign(options, {'silent': true});
    		this.loadData();
    	}
    } 

    if (property == "level") {
    	console.log('change level');
    }

    if (property == "opacity") {
    	console.log('change opacity');
    }


    this.update(assignable, options);

},

loadData: function() {
	if (this.state.level == 'departament') {
		this.byDepartment();
	}
},


onTriggerFilterApply: function(data) {
	alert('Apply filter to this layer')
	/*
	this.update({
		filters: data
	});
	if (this.state.dataLevel == 'departament') {
		this.onLoadActivitiesByDepartments();
	} else if (this.state.dataLevel == 'municipality') {
		this.onLoadActivitiesByMuncipalities();
	}
	*/
},


byMunicipality: function() {
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
			this.update({
				'geoData': geoData,
				'isLoaded': true
			});
		}.bind(this)).fail(function() {
			console.log('Error loading data ...');
		});
	},


byDepartment: function() {
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
			this.update({
				'geoData': geoData,
				'isLoaded': true
			});
		}.bind(this)).fail(function() {
			console.log('Error loading data ...');
		});
	},


});