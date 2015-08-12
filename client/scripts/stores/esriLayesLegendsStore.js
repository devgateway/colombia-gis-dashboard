'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var LegendActions = require('../actions/legendActions.js');
var API = require('../api/esri.js');
var Utils=require('../api/util.js');
var _ = require('lodash');

var ArcgisLayerStore = require('./ArcgisLayerStore.js');

module.exports = Reflux.createStore({

  listenables: LegendActions,
  // Initial setup
  init: function() {
    this.state = {
      layersLegends: []
    };
    this.listenTo(ArcgisLayerStore, this._handleArcgisLayersUpdate);
  },

  _handleArcgisLayersUpdate: function(data) {
    
    if (data.latestChange && data.latestChange.property == "addLayer") {
      this._addNewLegend(data.latestChange.value)
    } else if (data.latestChange && data.latestChange.property == "deleteLayer") {
      this._removeLegend(data.latestChange.value);
    } else if (data.latestChange && data.latestChange.property == "visible") {
      this._setLegendVisibility(data.latestChange.value.id, data.latestChange.value.visible);
    }

  },

  _addNewLegend: function(layer) {
    var layerLegends = _.find(this.state.layersLegends, {
      'id': layer.id
    });
    if (!layerLegends) {
      if (layer.type == 'Feature Service') {
        for (var i = 0; i < layer.layer.layers.length; i++) {
          var url = layer.url + "/" + i + "?f=json";
          API.findLegends(url).then(
            function(legends) {
              LegendActions.getLegends.completed(legends, layer);
            }).fail(function() {
            console.log('legendStore: Error loading data ...');
          });
        }
      } else {
        var url = layer.url + "/legend?&f=json";
        API.findLegends(url).then(
          function(legends) {
            LegendActions.getLegends.completed(legends, layer);
          }).fail(function() {
          console.log('legendStore: Error loading data ...');
        });
      }
    }
  },

  onGetLegends: function(layer) { //Should not be used anymore
    this._getLegends(layer);
  },


  onGetLegendsCompleted: function(legends, layer) { //Should not be used anymore
    var layerLegends = _.find(this.state.layersLegends, {
      'id': layer.id
    });
    var isNewLegend = false;
    if (!layerLegends) {
      isNewLegend = true;
      layerLegends = {
        'id': layer.id,
        'layerTitle': layer.title,
        'visible': true,
        "legendGroups": []
      };
    }
    if (layer.type == 'Feature Service') {
      var legendGroup = {};
      var subLayerLegend = _.find(layerLegends.legendGroups, {
        'layerName': legends.name
      });
      if (!subLayerLegend) {
        _.assign(legendGroup, {
          "layerName": legends.name
        });
        _.assign(legendGroup, {
          "legends": API.parseLegendsFromDrawInfo(legends)
        });
        layerLegends.legendGroups.push(legendGroup);
        if (isNewLegend) {
          this.state.layersLegends.push(layerLegends);
        }
      }
    } else if (isNewLegend) {
      legends.layers.map(function(layer) {
        var legendGroup = {};
        _.assign(legendGroup, {
          "layerName": layer.layerName
        });
        _.assign(legendGroup, {
          "legends": layer.legend
        });
        layerLegends.legendGroups.push(legendGroup);
      });
      this.state.layersLegends.push(layerLegends);
    }

    this.trigger(this.state);
  },

  onIsShown: function(value) {
    this.update({
      shown: value
    });
  },

  _removeLegend: function(legendId) {
    var index = _.indexOf(_.pluck(this.state.layersLegends, 'id'), legendId);;
    if (index >= 0) {
      this.state.layersLegends.splice(index, 1);
      this.trigger(this.state);
    }
  },

  _setLegendVisibility: function(legendId, value) {
    var layerLegend = _.find(this.state.layersLegends, {
      'id': legendId
    });
    if (layerLegend) {
      layerLegend.visible = value;
    }
    this.trigger(this.state);
  },

  getInitialState: function() {
    return this.state;
  },

  update: function(assignable, options) {
    options = options || {};
    this.state = assign(this.state, assignable);
    if (!options.silent) {
      this.trigger(this.state);
    }
  }

});