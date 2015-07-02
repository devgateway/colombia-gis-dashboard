'use strict';
var Reflux = require('reflux');
var API = require('../api/esri.js');


var search=Reflux.createAction({ asyncResult: true });
var loadLayer=Reflux.createAction();
var loadLayerCompleted=Reflux.createAction();
var restoreData=Reflux.createAction();
var loadLayerFailed=Reflux.createAction();
var restoreLayerButton=Reflux.createAction();
loadLayer.preEmit = function(options) {
	API.getService(options.url)
	.then(function(layer){
		if (layer.error){
			loadLayerFailed(layer.error.message,layer.error.code,options);			
		}else{
			loadLayerCompleted(layer,options);
		}
	})
	.fail(
		function(err,message){
			loadLayerFailed(message);
		})

	;
};

module.exports = {
	loadLayer:loadLayer,
	changeVisibility:Reflux.createAction(),
	search:search,
	loadLayerCompleted:loadLayerCompleted,
	loadLayerFailed:loadLayerFailed,
	restoreData:restoreData,
	restoreLayerButton:restoreLayerButton,
	addLayerToMap:Reflux.createAction(),
	layerAdded:Reflux.createAction(),
	serviceCreated:Reflux.createAction(),
	changeLayerValue:Reflux.createAction()
};