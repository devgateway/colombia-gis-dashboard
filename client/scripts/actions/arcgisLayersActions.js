'use strict';
var Reflux = require('reflux');
var api = require('../api/layers.js');


var search=Reflux.createAction({ asyncResult: true });
var addLayerToMap=Reflux.createAction();
var changeVisibility=Reflux.createAction();

module.exports = {
	addLayerToMap:addLayerToMap,
	changeVisibility:changeVisibility,
	search:search
};