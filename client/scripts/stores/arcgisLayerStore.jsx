'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var ArcgisLoginActions = require('../actions/arcgisLoginActions.js');
var Util= require('../api/util.js');


module.exports = Reflux.createStore({

	listenables: ArcgisLoginActions,

	onSearchOnArcGisCompleted:function(data){
		console.log(data);
		if (data){
			this.update({all:data.results});
		}
	},



	onAddLayerToMap:function(servideMetadata){
		this.loadLayer(servideMetadata);
	},


	loadLayer:function(servideMetadata){
		Util.request(servideMetadata.url).fail(function(err, message){
		//check if failed due to login redirect 
			if (arguments[0].responseURL.indexOf('login') > - 1){ // TOOD: Find a better way!
				servideMetadata.loginRequired=true;
				this.trigger(this.state);
			}else{
				console.log(message);
			}

		}.bind(this)).then(function(service){
			if ( !_.findWhere(this.state.services,service) ){
						assign(service,{metadata:servideMetadata,defaultVisibility:true}); //adding metadata and default visibility
						this.addService(service);
					}
				}.bind(this));      
	},

	addService:function(layer){
		this.state.services.push(layer);
		this.trigger(this.state);
	},

	onToggleLayerVisibility:function(){
		alert("onToggleLayerVisibility");
	},

	onRemoveLayer:function(){
		alert("onRemoveLayer");
	},

	update: function(assignable, options) {
		options = options || {};
		this.state = assign(this.state, assignable);
		if (!options.silent) {
			this.trigger(this.state);
		}
	},

	getInitialState: function() {
		return (this.state = {
			services:[],
			all:[]
		});
	}

});



