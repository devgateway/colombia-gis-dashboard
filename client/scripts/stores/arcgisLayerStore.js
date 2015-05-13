'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var ArcgisLayersActions = require('../actions/arcgisLayersActions.js');
var Util = require('../api/util.js');
var API = require('../api/esri.js');
var _ = require('lodash');

var storedState; //= require('./layer_samples.js')

module.exports = Reflux.createStore({

	listenables: ArcgisLayersActions,

	onAddLayerToMap: function(layer) {
		if (!_.findWhere(this.state.layers, {id: layer.id})) {
			this.state.layers.push(layer);
			_.assign(layer, {'opacity': 1,'zIndex': this.nextZindex(),'visible':true});
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

	onChangeLayerValue: function(property, id, value) {
		console.log(arguments);
		var theLayer = _.findWhere(this.state.layers, {
			'id': id
		});

		if (property == 'moveDown') {
			var currentZindex = theLayer.zIndex;
			if (currentZindex > 0) {
				var newZindex = currentZindex - 1;
				var replaceWith = _.findWhere(this.state.layers, {
					zIndex: newZindex
				});
				theLayer.zIndex = newZindex; //the layer gets z-index-1
				replaceWith.zIndex = currentZindex; //the one that was in tha position takes  theLayer's z-index
			}
		} else if (property == 'moveUp') {
			var currentZindex = theLayer.zIndex;
			if (currentZindex < this.state.layers.length) {
				//next will be 
				var newZindex = currentZindex + 1;
				var replaceWith = _.findWhere(this.state.layers, {
					zIndex: newZindex
				});
				theLayer.zIndex = newZindex; //the layer gets z-index-1
				replaceWith.zIndex = currentZindex; //the one that was in tha position takes  theLayer's z-index
			}
		} else {
			theLayer[property] = value;
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
		if (!this.state) {
			this.state = storedState || {
				layers: []
			};
		}
		return this.state;
	},


});