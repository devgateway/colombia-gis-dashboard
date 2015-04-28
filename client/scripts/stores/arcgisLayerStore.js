'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var ArcgisLayersActions = require('../actions/arcgisLayersActions.js');
var Util= require('../api/util.js');
var API=require('../api/esri.js');
var _ = require('lodash');

var storedState//=require('./layer_samples.js')
module.exports = Reflux.createStore({

	listenables: ArcgisLayersActions,

	onSearchCompleted:function(data,append){
		console.log("arcgisLayerStore: ... onSearchOnArcGisCompleted .... ");
		if (data){
			if(append){
				data.results=this.appendSearchResults(data.results)
			};
			this.update({results:data});
		}
	},


	appendSearchResults:function(items){
		var previous=this.state.results.results;
		return previous.concat(items);	
	},


	onSearch:function(options,append){
		_.assign(options,{})
		API.findLayers(options).then(function(data){
			ArcgisLayersActions.search.completed(data,append)
		}).fail(function(){
			console.log('arcgisLayerStore:  Error loading data ...');
			this.state.error='Can\'t load data please check your network connection';
			this.trigger(this.state);
		}.bind(this));
	},

	onChangeVisibility:function(){
		this.trigger(this.state);
	},

	loadLayerFailed:function(error,code){
		this.state.error={'message':error,'code':code}
		this.trigger(this.state);
		console.log('Error '+error);
	},

	loadLayerCompleted:function(service,serviceMetadata){
		if ( _.findWhere(this.state.services,service)){ //check if service was already added 
			this.loadLayerFailed("This service is alredy added")

		}else{
			assign(serviceMetadata,{'added':true}); // mark record as added 
			assign(service,{defaultVisibility:true,metadata:serviceMetadata}) // set default visibility to true we want
			this.addService(service); //add service to map services 
		}
		 
	},	

	addService:function(layer){
		this.state.services.push(layer);
		this.state.error=null;
		this.trigger(this.state);
	},

	onToggleLayerVisibility:function(){
		this.trigger(this.state)
	},

	onRemoveLayer:function(){
		//find layer remove and trigger
	},

	update: function(assignable, options) {
		options = options || {};
		this.state = assign(this.state, assignable);
		if (!options.silent) {
			this.trigger(this.state);
		}
	},

	getInitialState: function() {
		if (!this.state){
			this.state=storedState || {services:[], results:{}};
		}	
		return this.state;
	}

});



