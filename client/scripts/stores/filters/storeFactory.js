'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins = require('./mixins.js');
var Actions = require('../../actions/filterListActions.js');


function makeStore(actions, source) {

	return Reflux.createStore(source, {
		listenables: actions,
		mixins: [Mixins],
		load: function() {
			this._loadItems(window.DATA_PATH + source);
		},
	})
};

	module.exports {
		ActivityClassificationType: createStore(Actions.ActivityClassificationType, 'clasificationType.json'),
		ActivityClassificationSubType1: createStore(Actions.ActivityClassificationSubType1, 'clasificationSubType1.json'),
		AorCor: createStore(Actions.AorCor, 'aor-corNames.json'),
		ContractType: createStore(Actions.ContractType, 'contractTypes.json'),
		Crops: createStore(Actions.Crops, 'cropsList.json'),
		DevelopmentObjectives: createStore(Actions.DevelopmentObjectives, 'doList.json'),
		EnvironmentalManagementPlans: createStore(Actions.EnvironmentalManagementPlans, 'typesEnviromentalPlans.json'),
		PublicPrivatePartnership: createStore(Actions.PublicPrivatePartnership, 'publicPrivatePartnership.json'),
		RapidImpact: createStore(Actions.RapidImpact, 'rapidImpact.json'),
		SubActivityStatus: createStore(Actions.SubActivityStatus, 'subActivityStatus.json'),
		SubImplementers: createStore(Actions.SubImplementers, 'subImplementers.json'),
		SubImplementersType: createStore(Actions.SubImplementersType, 'subImplementersType.json'),
		TargetPopulation: createStore(Actions.TargetPopulation, 'targetPopulation.json'),
	}