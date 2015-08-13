'use strict';
var _ = require('lodash');
var assign = require('object-assign');
var StoreDispatcher = require('./storeCreator.js');
var DateStore=require('./dateStore.js');
var ValueRangeStore=require('./valueRangeStore.js');

module.exports = {

init: function() {
		this.state=this.state||{};

		this.listenTo(StoreDispatcher.ClassificationTypeBasic, this._collectFilters(['a1','a2'], true));
		this.listenTo(StoreDispatcher.ClassificationTypeAdvanced, this._collectFilters(['a1','a2','a3','a4','a5'], true));
		this.listenTo(StoreDispatcher.AorCor, this._collectFilters('ar'));

		this.listenTo(StoreDispatcher.ContractType, this._collectFilters('ct'));
		this.listenTo(StoreDispatcher.Crops, this._collectFilters('cr'));
		this.listenTo(DateStore, this._collectFilters(['sd','ed']));

		this.listenTo(StoreDispatcher.DevelopmentObjectives, this._collectFilters('do'));
		this.listenTo(StoreDispatcher.EnvironmentalManagementPlans, this._collectFilters('te'));
		this.listenTo(StoreDispatcher.Locations, this._collectFilters(['de','mu'], true));

		this.listenTo(StoreDispatcher.PublicPrivatePartnership, this._collectFilters('pp'));
		this.listenTo(StoreDispatcher.RapidImpact, this._collectFilters('ri'));
		this.listenTo(StoreDispatcher.SubActivityStatus, this._collectFilters('st'));

		this.listenTo(StoreDispatcher.SubImplementers, this._collectFilters(['sit','si'], true));
		this.listenTo(StoreDispatcher.TargetPopulation, this._collectFilters('tp'));
		this.listenTo(ValueRangeStore, this._collectFilters(['vr1','vr2']));

	},
}