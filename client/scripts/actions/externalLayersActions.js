'use strict';
var Reflux = require('reflux');
var api = require('../api/layers.js');

var searchOnArcGis = Reflux.createAction({ asyncResult: true });
	searchOnArcGis.listenAndPromise(api.findLayers);
var addLayerToMap=Reflux.createAction();

module.exports = {
	searchOnArcGis:searchOnArcGis,
	addLayerToMap:addLayerToMap
};