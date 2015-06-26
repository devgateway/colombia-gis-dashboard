'use strict';
var Reflux = require('reflux');

module.exports = {
	activityLayerInit:Reflux.createAction(),
    restoreData:Reflux.createAction({ asyncResult: true }),
	changeLayerValue:Reflux.createAction(),
	triggerFilterApply: Reflux.createAction(),
};