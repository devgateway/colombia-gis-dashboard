'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins=require('./mixins.js');
var actions=require('../../actions/filterListActions.js');
var StoreDispatcher = require('./storeDispatcher.js');
var DateStore=require('./dateStore.js');

module.exports = Reflux.createStore({

	listenables: actions,

	_collectFilters:function(params, isTree){
		if (!isTree){
			return function(value, selection){
				if (_.isArray(params)){
					_.forEach(params, function(param){
						this.state[param] = _.isArray(value)? _.map(_.filter(value[param].items, function(it){return it.selected}), 'id'): value[param];
					}.bind(this));
				} else {
					this.state[params] = _.map(_.filter(value.items, function(it){return it.selected}), 'id');
				}
			}
		} else {
			return function(value, selection){
				_.forEach(params, function(param){
					this.state[param] =  _.map(_.filter(value[param], function(it){return it.selected}), 'id');
				}.bind(this));				
			}
		}
	},

	init: function() {
		this.state=this.state||{};

		this.listenTo(StoreDispatcher.ClassificationType, this._collectFilters(['a1','a2','a3','a4','a5'], true));
		this.listenTo(StoreDispatcher.AorCor, this._collectFilters('ar'));

		this.listenTo(StoreDispatcher.ContractType, this._collectFilters('cr'));
		this.listenTo(StoreDispatcher.Crops, this._collectFilters('ct'));
		this.listenTo(DateStore, this._collectFilters(['sd','ed']));

		this.listenTo(StoreDispatcher.DevelopmentObjectives, this._collectFilters('do'));
		this.listenTo(StoreDispatcher.EnvironmentalManagementPlans, this._collectFilters('te'));
		this.listenTo(StoreDispatcher.Locations, this._collectFilters(['de','mu'], true));

		this.listenTo(StoreDispatcher.PublicPrivatePartnership, this._collectFilters('pp'));
		this.listenTo(StoreDispatcher.RapidImpact, this._collectFilters('ri'));
		this.listenTo(StoreDispatcher.SubActivityStatus, this._collectFilters('st'));

		this.listenTo(StoreDispatcher.SubImplementers, this._collectFilters(['sit','si'], true));
		this.listenTo(StoreDispatcher.TargetPopulation, this._collectFilters('tp'));

	},

	onApplyFilters:function(){
		var filters = [];
		for (var key in this.state) {
			if (this.state.hasOwnProperty(key) && this.state[key].length>0){
			  	var selection = {'param': key, 'values': this.state[key]};
			    filters.push(selection);
			}
		}
		this.trigger(filters);		
	},

	getInitialState: function() {
		return (this.state = {});
	}
})
