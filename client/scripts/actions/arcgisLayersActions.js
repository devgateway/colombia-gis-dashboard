'use strict';
var Reflux = require('reflux');
var API = require('../api/esri.js');


var search=Reflux.createAction({ asyncResult: true });
var loadLayer=Reflux.createAction();
var loadLayerCompleted=Reflux.createAction();
var changeVisibility=Reflux.createAction();
var loadLayerFailed=Reflux.createAction();


loadLayer.preEmit = function(metadata) {
	API.getService(metadata.url).fail(function(err,message){
		loadLayerFailed(message);
	}).then(function(service){
		if (service.error){
			loadLayerFailed(service.error.message,service.error.code);			
		}else{
			loadLayerCompleted(service,metadata);
		}
	});
};

module.exports = {
	loadLayer:loadLayer,
	changeVisibility:changeVisibility,
	search:search,
	loadLayerCompleted:loadLayerCompleted,
	loadLayerFailed:loadLayerFailed
};