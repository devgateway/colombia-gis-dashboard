'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var ArcgisLayersActions = require('../actions/arcgisLayersActions.js');
var RestoreActions = require('../actions/restoreActions.js');
var Util = require('../api/util.js');
var API = require('../api/esri.js');
var _ = require('lodash');
var LoadingAction = require('../actions/loadingActions.js');

var CommonsMixins = require('./_mixins.js');

var storedState;//= require('./layer_samples.js');

function setVisibility(layers){
	layers.map(function(l){
		l.visible=l.defaultVisibility; 
	});
}

function setOpaciy(layers){
	layers.map(function(l){
		l.opacity=1; 
	});	
}

module.exports = Reflux.createStore({

	listenables: [ArcgisLayersActions, RestoreActions],
    mixins: [CommonsMixins],

	onAddLayerToMap: function(layer) {
    	console.log('stores->arcgisLayerStore>onAddLayerToMap');
    	LoadingAction.showLoading();
		if (!_.findWhere(this.state.layers, {id: layer.id})) {
			
			var options={'opacity': 1,'visible':true, 'created':null}; //default values for all layers 

			if (layer.type==='Feature Service'){
				setVisibility(layer.layer.layers);
				setOpaciy(layer.layer.layers);	
			} else {
				_.assign(options,{'zIndex': this.nextZindex()});
			}

			_.assign(layer, options);
			this.state.layers.push(layer);
			var latestChange  = {};
			latestChange.latestChange = {'property':'addLayer', 'value':layer};
			this.update(latestChange, {'silent': true});
			this.trigger(this.state);
		}
	},

	onServiceCreated: function(id) {
		_.assign(_.findWhere(this.state.layers, {id: id}), {
			created: true
		});
	},

	onLayerAdded: function(id) {
		var layer = _.findWhere(this.state.layers, {id: id});
		_.assign(layer, {'added':true});
		this.trigger(this.state);
		LoadingAction.hideLoading();
	},

	onChangeLayerValue: function(property, id, value, idx) {
		console.log(arguments);
		var theLayer = _.findWhere(this.state.layers, {'id': id});
		var isFeature=theLayer.type=='Feature Service';
		var latestChange = {};

		if (property === 'delete') {
			var index = _.indexOf(_.pluck(this.state.layers, 'id'), theLayer.id);
			this.state.layers.splice(index, 1);
			latestChange.latestChange = {'property':'deleteLayer', 'value':theLayer.id};
			this.update(latestChange, {'silent': true});
			ArcgisLayersActions.restoreLayerButton(theLayer.id);
		} else if (property === 'moveDown' && !isFeature) {
			var currentZindex = theLayer.zIndex;
			if (currentZindex > 0) {
				var newZindex = currentZindex - 1;
				var replaceWith = _.findWhere(this.state.layers, {
					zIndex: newZindex
				});
				theLayer.zIndex = newZindex; //the layer gets z-index-1
				replaceWith.zIndex = currentZindex; //the one that was in tha position takes  theLayer's z-index
			}
		} else if (property === 'moveUp' && !isFeature) {
			var currentZindex = theLayer.zIndex;
			if (currentZindex < this.state.layers.length) {
				var newZindex = currentZindex + 1;
				var replaceWith = _.findWhere(this.state.layers, {
					zIndex: newZindex
				});
				theLayer.zIndex = newZindex; //the layer gets z-index-1
				replaceWith.zIndex = currentZindex; //the one that was in tha position takes  theLayer's z-index
			}
		} else {
			if(!idx){
				theLayer[property] = value;
				latestChange.latestChange = {'property':'visible', 'value':theLayer};
				this.update(latestChange, {'silent': true});
			}

			if (isFeature){ //this is feature layer
				if (idx){
					_.find(theLayer.layer.layers,{id:parseInt(idx)})[property]=value;	
					latestChange.latestChange = {'property':'visible', 'value':theLayer};
					this.update(latestChange, {'silent': true});
				} else {
					theLayer.layer.layers.map(function(l){
						l[property]=value;
					});
				}
			}
		}
		this.trigger(this.state);
	},

	onRestoreData: function(savedData) {
		if(savedData.arcgisState){
			savedData.arcgisState.layers.map(function(l){
				ArcgisLayersActions.loadLayer(l);
			});
		}
	},

	nextZindex: function() {
		if (!this.lastZindex) {
			this.lastZindex = 0;
		}
		return this.lastZindex++;
	},

	getInitialState: function() {
		if (!this.state) {
			this.state = storedState || {
				layers: [],
				saveItems: ['layers']
			};
		}
		return this.state;
	},

});