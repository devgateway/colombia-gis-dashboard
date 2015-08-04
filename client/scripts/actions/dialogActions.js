'use strict';
var Reflux = require('reflux');
module.exports = {
	changeFundingTypeSelection:Reflux.createAction(),
    changeFundingSourceSelection:Reflux.createAction(),
    layerInit :Reflux.createAction(),
    restoreData:Reflux.createAction(),
	changeLayerValue:Reflux.createAction(),
	triggerFilterApply: Reflux.createAction(),
};

