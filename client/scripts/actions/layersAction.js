'use strict';
var Reflux = require('reflux');

module.exports = {
	changeGroupFilterSelection:Reflux.createAction(),
	changeFilterSelection:Reflux.createAction(),
	layerInit :Reflux.createAction(),
    restoreData:Reflux.createAction(),
	changeLayerValue:Reflux.createAction(),
	triggerFilterApply: Reflux.createAction(),
};