'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins=require('./mixins.js');
var actions=require('../../actions/filterListActions.js');

var ActivityClassificationSubType1Store=require('./activityClassificationSubType1Store.js');
var ActivityClassificationTypeStore=require('./activityClassificationTypeStore.js');
var AorCorStore=require('./aorCorStore.js');

var ContractTypeStore=require('./contractTypeStore.js');
var CropsStore=require('./cropsStore.js');
var DepartamentsStore=require('./departamentsStore.js');

var DevelopmentObjectivesStore=require('./developmentObjectivesStore.js');
var EnvironmentalManagementPlansStore=require('./environmentalManagementPlansStore.js');
var MunicipalitiesStore=require('./municipalitiesStore.js');

var PublicPrivatePartnershipStore=require('./publicPrivatePartnershipStore.js');
var RapidImpactStore=require('./rapidImpactStore.js');
var SubActivityStatusStore=require('./subActivityStatusStore.js');

var SubImplementersStore=require('./subImplementersStore.js');
var SubImplementersTypeStore=require('./subImplementersTypeStore.js');
var TargetPopulationStore=require('./targetPopulationStore.js');

module.exports = Reflux.createStore({

	listenables: actions,

	_collectFilters:function(param){
		return function(value, selection){
			if (selection){
				this.state[param]=value;
			}
		}
	},

	init: function() {
		this.state=this.state||{};

		this.listenTo(ActivityClassificationSubType1Store, this._collectFilters('a2'));
		this.listenTo(ActivityClassificationTypeStore, this._collectFilters('a1'));
		this.listenTo(AorCorStore, this._collectFilters('ar'));

		this.listenTo(ContractTypeStore, this._collectFilters('cr'));
		this.listenTo(CropsStore, this._collectFilters('ct'));
		this.listenTo(DepartamentsStore, this._collectFilters('de'));

		this.listenTo(DevelopmentObjectivesStore, this._collectFilters('do'));
		this.listenTo(EnvironmentalManagementPlansStore, this._collectFilters('te'));
		this.listenTo(MunicipalitiesStore, this._collectFilters('mu'));

		this.listenTo(PublicPrivatePartnershipStore, this._collectFilters('pp'));
		this.listenTo(RapidImpactStore, this._collectFilters('ri'));
		this.listenTo(SubActivityStatusStore, this._collectFilters('st'));

		this.listenTo(SubImplementersStore, this._collectFilters('si'));
		this.listenTo(SubImplementersTypeStore, this._collectFilters('sit'));
		this.listenTo(TargetPopulationStore, this._collectFilters('tp'));

	},

	onApplyFilters:function(){
		var filters = [];
		for (var key in this.state) {
		  if (this.state.hasOwnProperty(key)) {
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
