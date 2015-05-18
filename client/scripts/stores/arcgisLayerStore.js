'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var ArcgisLayersActions = require('../actions/arcgisLayersActions.js');
var Util = require('../api/util.js');
var API = require('../api/esri.js');
var _ = require('lodash');

var storedState= require('./layer_samples.js');

module.exports = Reflux.createStore({

	listenables: ArcgisLayersActions,

	onAddLayerToMap: function(layer) {
		if (!_.findWhere(this.state.layers, {id: layer.id})) {
			var options={'opacity': 1,'visible':true};
			if (layer.type=='Feature Service'){
				//_.assign(options,'zIndexOffset': )				
			}else{
				_.assign(options,{'zIndex': this.nextZindex()});
			}

			_.assign(layer, options);
			
			this.state.layers.push(layer);
			this.trigger(this.state);
		}
	},

	onServiceCreated: function(id) {
		_.assign(_.findWhere(this.state.layers, {id: id}), {
			created: true
		})
	},

	onLayerAdded: function(id) {
		var layer = _.findWhere(this.state.layers, {id: id});
		_.assign(layer, {'added':true});
		this.trigger(this.state);
	},

	onChangeLayerValue: function(property, id, value, idx) {
		console.log(arguments);
		var theLayer = _.findWhere(this.state.layers, {'id': id});
		var isTile=theLayer.type!='Feature Service';

		if (property == 'moveDown' && isTile) {
			var currentZindex = theLayer.zIndex;
			if (currentZindex > 0) {
				var newZindex = currentZindex - 1;
				var replaceWith = _.findWhere(this.state.layers, {
					zIndex: newZindex
				});
				theLayer.zIndex = newZindex; //the layer gets z-index-1
				replaceWith.zIndex = currentZindex; //the one that was in tha position takes  theLayer's z-index
			}
		} else if (property == 'moveUp' && isTile) {
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

			if (idx){ //if idx is present this is a layer of feature service 
				var prop='layers_'+property;
				theLayer[prop]=theLayer[prop]||{}
				theLayer[prop][idx]=value;
			}else{
				theLayer[property] = value;
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

	nextZindex: function() {
		if (!this.lastZindex) {
			this.lastZindex = 0
		}
		return this.lastZindex++;
	},

	getInitialState: function() {
		debugger;	
		if (!this.state) {
			this.state = storedState || {
				layers: [],

			};
		}
		return this.state;
	},





});