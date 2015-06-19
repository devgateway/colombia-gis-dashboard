'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins=require('./mixins.js');
var actions=require('../../actions/filterListActions.js');

var DepartamentsStore=require('./departamentsStore.js');
var MunicipalitiesStore=require('./municipalitiesStore.js');
var TargetPopulationStore=require('./targetPopulationStore.js');

module.exports = Reflux.createStore({

	listenables: actions,

	_collectFilters:function(param){
	
		return function(value){this.state[param]=value}
	},

	init: function() {
		this.state=this.state||{};
		this.listenTo(DepartamentsStore, this._collectFilters('de'));
		this.listenTo(MunicipalitiesStore, this._collectFilters('mu'));
		this.listenTo(TargetPopulationStore, this._collectFilters('tp'));

	},

	onApplyFilters:function(){
		console.log('-----------APPLY FILTERS-----------------');
		console.log(this.state);
		console.log('-------------END APPLY FILTERS---------------');
	},

	getInitialState: function() {
		return (this.state = {});
	}
})
