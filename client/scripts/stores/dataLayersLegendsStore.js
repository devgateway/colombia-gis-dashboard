'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var LegendActions = require('../actions/legendActions.js');
var API = require('../api/esri.js');
var _ = require('lodash');

var ShapesLayerStore = require('./shapesLayerStore.js');
var PointsLayerStore = require('./pointsLayerStore.js');

module.exports = Reflux.createStore({

  listenables: LegendActions,

  init: function() {
    this.state = {
      layersLegends: []
    };
    this.listenTo(ShapesLayerStore, this._handleDataLayersUpdate);
    this.listenTo(PointsLayerStore, this._handleDataLayersUpdate);
  },

  _handleDataLayersUpdate: function(data) {

    var exists = _.find(this.state.layersLegends, {'id': data.id});

    if (!exists) {
      this._makeLegend(data.id, data);
    }

    this._setLegendVisibility(data.id, data.visible);
    this._setLegendSubtitle(data.id, data.subtitle);
    
    if (data.subProperty) {
      var level = data.subProperty;
      this._setLegendColor(data.id, data.breaks.breaks[level].style.color, level.split("Level")[1])
      this._setLegendLabel(data.id, data.breaks.breaks[level], level.split("Level")[1])
    }
  },

  _makeLegend: function(id, data) {
 
    var legends = [];

    var breaks = data.breaks.breaks;
    var keys = _.keys(breaks);

    _.map(keys,
      function(k) {
        var level = k;
        var label = " " + breaks[level]["min"] + " - " + breaks[level]["max"];
        var hexColor = this._rgbToHex(breaks[level]["style"]["color"]["r"], breaks[level]["style"]["color"]["g"], breaks[level]["style"]["color"]["b"]);
        var rgbColor = [breaks[level]["style"]["color"]["r"], breaks[level]["style"]["color"]["g"], breaks[level]["style"]["color"]["b"]];
          
        
        var symbol=_.clone(data.breaks.symbol);
            var theSymbol=_.clone(data.breaks.symbol.symbol);
            _.assign(theSymbol,{color:rgbColor});
            _.assign(symbol,{symbol:theSymbol});

        if(id=='shapes'){
          
           console.log('level'+level);
           console.log(symbol);
        }

        var legendData=_.assign({height: 20,imageColor: hexColor,label: label,url: "",width: 20},symbol);
        
        legends.push(legendData);
      
      }.bind(this)); //end map

    var theGroup = _.assign(this._createGroupObject(data), {
      legends: legends
    })

    var legend = _.assign(this._createLegendObject(data), {
      legendGroups: [theGroup]
    });

    this.state.layersLegends.push(legend);
    this.trigger(this.state)
  },

  _createLegendObject: function(data) {
    return {
      'id': data.id,
      'layerTitle': data.title,
      'visible': data.visible,
      "legendGroups": []
    }
  },

  _createGroupObject: function(data) {
    return {
      "layerName": data.subtitle,
      "legends": []
    }
  },


  _rgbToHex: function(r, g, b) {
    return "#" + this._toHex(r) + this._toHex(g) + this._toHex(b);
  },

  _toHex: function(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return "00";
    n = Math.max(0, Math.min(n, 255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
  },


  _setLegendColor: function(layerId, rgbColor, level) {
    var layerLegend = _.find(this.state.layersLegends, {
      'id': layerId
    });
    if (layerLegend) {
      var legend = layerLegend.legendGroups[0].legends[level];
      if (legend.contentType == "image/png") {
        legend.imageColor = this._rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);
      } else {
        legend.symbol.color[0] = rgbColor.r;
        legend.symbol.color[1] = rgbColor.g;
        legend.symbol.color[2] = rgbColor.b;
      }
      this.trigger(this.state);
    }
  },

  _setLegendLabel: function(layerId, brk, level) {
    var layerLegend = _.find(this.state.layersLegends, {
      'id': layerId
    });
    if (layerLegend) {

      var legend = layerLegend.legendGroups[0].legends[level];
      if (layerLegend.id.indexOf("Funding") != -1) {
        var minLabel = brk.min.toFixed(brk.min < 10 ? 2 : 0);
        var maxLabel = brk.max.toFixed(brk.max < 10 ? 2 : 0);
      } else {
        var minLabel = brk.min.toFixed(0);
        var maxLabel = (brk.max - 1).toFixed(0);
      }
      legend.label = " " + minLabel + " - " + maxLabel;
      this.trigger(this.state);
    }
  },


  _setLegendVisibility: function(id, value) {
    var layerLegend = _.find(this.state.layersLegends, {
      'id': id
    });
    if (layerLegend) {
      layerLegend.visible = value;
    }
    this.trigger(this.state);
  },

  _setLegendSubtitle: function(id, value) {
    var layerLegend = _.find(this.state.layersLegends, {
      'id': id
    });
    if (layerLegend) {
      var legendGroups=_.clone(layerLegend.legendGroups);
      _.map(legendGroups, function(l){l.layerName=value;});
      _.assign(legendGroups,{legendGroups});
    }
    this.trigger(this.state);
  },

  getInitialState: function() {

    return {
      layerLegend: []
    };

  },

  update: function(assignable, options) {
    options = options || {};
    this.state = assign(this.state, assignable);
    if (!options.silent) {
      this.trigger(this.state);
    }
  }

});