'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins=require('./treeMixins.js');
var actions=require('../../actions/filterListActions.js').Locations;

module.exports = Reflux.createStore({
	listenables: actions,
	mixins: [Mixins],

	init: function(){
		this.state = {};
		this.state.levels = {
		'level': 0, 
		'levelName': 'departments', 
		'sourcePath': '/departmentList.json',
		'child': {
			'level': 1, 
			'levelName': 'municipalities', 
			'sourcePath': '/municipalitiesList.json', 
			'parentIdField': 'idDepto'
			}
		};
	}	

})
