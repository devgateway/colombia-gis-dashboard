'use strict';
var Reflux = require('reflux');

module.exports = {
	changeFundingFilterSelection:Reflux.createAction(),
    activityLayerInit:Reflux.createAction(),
    restoreData:Reflux.createAction(),
	changeLayerValue:Reflux.createAction(),
	triggerFilterApply: Reflux.createAction(),
};