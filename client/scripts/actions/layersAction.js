'use strict';
var Reflux = require('reflux');

module.exports = {
	activityLayerInit:Reflux.createAction(),
	changeLayerValue:Reflux.createAction(),
	triggerFilterApply: Reflux.createAction(),
};