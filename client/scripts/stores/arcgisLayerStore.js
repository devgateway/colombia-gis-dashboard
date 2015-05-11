'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var ArcgisLayersActions = require('../actions/arcgisLayersActions.js');
var Util = require('../api/util.js');
var API = require('../api/esri.js');
var _ = require('lodash');

var storedState;//= require('./layer_samples.js')

module.exports = Reflux.createStore({

	listenables: ArcgisLayersActions,
	
	onAddLayerToMap: function(layerInfo) {
		if (!_.findWhere(this.state.layers,{id:layerInfo.id})) {
			this.state.layers.push(layerInfo);
			this.trigger(this.state);
		}
	},



	onServiceCreated:function(layerInfo){
		_.assign(_.findWhere(this.state.layers,{id:layerInfo.id}),{created:true})
	},


	onLayerAdded:function(leaFletLayerInfo){
		
		_.assign(leaFletLayerInfo,{'opacity':1,'zIndex':this.nextZindex()});

		this.state.leafletLayers.push(leaFletLayerInfo);
		this.trigger(this.state);
		
	},

	onChangeLayerValue:function(property,id,value){
		console.log(arguments);
		var theLayer=_.findWhere(this.state.leafletLayers,{'id':id});
			
		if(property=='opacity'){
			theLayer.opacity=value;
		}

		if(property=='moveDown'){
			var currentZindex=theLayer.zIndex;
				if (currentZindex >0){
					//next will be 
					var newZindex=currentZindex-1;
					var replaceWith=_.findWhere(this.state.leafletLayers,{zIndex:newZindex});
					theLayer.zIndex=newZindex; //the layer gets z-index-1
					replaceWith.zIndex=currentZindex; //the one that was in tha position takes  theLayer's z-index
				}
		}

		if(property=='moveUp'){
			var currentZindex=theLayer.zIndex;
				if (currentZindex < this.state.leafletLayers.length-1){
					//next will be 
					var newZindex=currentZindex+1;
					var replaceWith=_.findWhere(this.state.leafletLayers,{zIndex:newZindex});
					theLayer.zIndex=newZindex; //the layer gets z-index-1
					replaceWith.zIndex=currentZindex; //the one that was in tha position takes  theLayer's z-index
				}
		}
		this.trigger(this.state)

	},

	update: function(assignable, options) {
		options = options || {};
		this.state = _.assign(this.state, assignable);
		if (!options.silent) {
			this.trigger(this.state);
		}
	},

	nextZindex:function(){
		if (!this.lastZindex){
			this.lastZindex=0
		}
		return  this.lastZindex++;
	},

	getInitialState: function() {
		if (!this.state) {
			this.state = storedState || {
				layers: [],
				leafletLayers:[]
			};
		}
		return this.state;
	},

	getControlLayers:function(){
		return this.state.leafletLayers;
	}

});