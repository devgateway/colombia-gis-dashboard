'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var ArcgisLayersActions = require('../actions/arcgisLayersActions.js');
var Util= require('../api/util.js');
var API=require('../api/esri.js');
var _ = require('lodash');
module.exports = Reflux.createStore({

	listenables: ArcgisLayersActions,

	onSearchCompleted:function(data){
		console.log("arcgisLayerStore: ... onSearchOnArcGisCompleted .... ");
		if (data){
			this.update({all:data.results});
		}
	},

	onSearch:function(options){
		API.findLayers(options).then(function(data){
			ArcgisLayersActions.search.completed(data)
		}).fail(function(){
			console.log('arcgisLayerStore:  Error loading data ...');
		})
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
		
		if ( !_.findWhere(this.state.services,service) ){
					assign(service,{metadata:serviceMetadata,defaultVisibility:true}); //adding metadata and default visibility
					assign(service,{'added':true});
					this.addService(service);
				}else{
					this.loadLayerFailed("This service is alredy added")

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
			this.state={services:[],all:[]};
		}	
		return this.state;
	}

});



