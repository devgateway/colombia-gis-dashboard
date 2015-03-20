'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var ArcgisLayersActions = require('../actions/arcgisLayersActions.js');
var Util= require('../api/util.js');
var API=require('../api/layers.js');
var _ = require('lodash');
module.exports = Reflux.createStore({

	listenables: ArcgisLayersActions,

	onSearchCompleted:function(data){
		console.log("... onSearchOnArcGisCompleted .... ");
		if (data){
			this.update({all:data.results});
		}
	},

	onSearch:function(query){
		API.findLayers(query).then(function(data){
			ArcgisLayersActions.search.completed(data)
		}).fail(function(){
			console.log('Error loading data ...');
		})
	},

	onChangeVisibility:function(){
		
		this.trigger(this.state);
	},

	onAddLayerToMap:function(servideMetadata){
		this.loadLayer(servideMetadata);
	},


	loadLayer:function(serviceMetadata){
		Util.request(serviceMetadata.url).fail(function(err, message){
		//check if failed due to login redirect 
			if (arguments[0].responseURL.indexOf('login') > - 1){ // TOOD: Find a better way!
				assign(serviceMetadata,{'loginRequired':true});
				this.trigger(this.state);
			}else{
				console.log(message);
			}

		}.bind(this)).then(function(service){
			
			if ( !_.findWhere(this.state.services,service) ){
						assign(service,{metadata:serviceMetadata,defaultVisibility:true}); //adding metadata and default visibility
						assign(service,{'added':true});
						this.addService(service);
					}
				}.bind(this));      
	},

	addService:function(layer){
		this.state.services.push(layer);
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



