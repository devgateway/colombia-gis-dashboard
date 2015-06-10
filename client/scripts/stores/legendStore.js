
'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var LegendActions = require('../actions/legendActions.js');
var API = require('../api/esri.js');
var _ = require('lodash');
var ShapesLayerStore = require('./shapesLayerStore.js');
var PointsLayerStore = require('./pointsLayerStore.js');
var ArcgisLayerStore = require('./arcgisLayerStore.js');

module.exports=Reflux.createStore({

    listenables: LegendActions,
    // Initial setup
    init: function() {
       this.state = {layersLegends: []}; 

       this.listenTo(ShapesLayerStore, this._handleDataLayersUpdate);   
       this.listenTo(PointsLayerStore, this._handleDataLayersUpdate); 
       this.listenTo(ArcgisLayerStore, this._handleArcgisLayersUpdate); 

       this._addLegends();

    },

    _handleDataLayersUpdate: function(data) {
      if(data.latestChange && data.latestChange.property == "visible"){ 
        this._setLegendVisibility(data.breaks.field, data.visible);
      } else if(data.latestChange && data.latestChange.property == "color"){ 
        var level = data.latestChange.subProperty;
        this._setLegendColor(data.breaks.field, data.breaks.breaks[level].style.color, level.split("Level")[1])
      }

    },

    _handleArcgisLayersUpdate: function(data) {
    },

    onGetLegends: function(layer) {
      if (layer.type=='Feature Service'){
        for (var i=0; i<layer.layer.layers.length;i++){
          var url = layer.url + "/"+i+"?f=json"; 
          API.findLegends(url).then(
          function(legends){
            LegendActions.getLegends.completed(legends, layer);
          }).fail(function(){
            console.log('legendStore: Error loading data ...');
          });
        }          
      } else {
        var url = layer.url + "/legend?&f=json";
        API.findLegends(url).then(
        function(legends){
          LegendActions.getLegends.completed(legends, layer);
        }).fail(function(){
          console.log('legendStore: Error loading data ...');
        });
      }        
    },

    onGetLegendsCompleted: function(legends, layer){
        
        if (layer.type=='Feature Service'){
          var added = true;
          var layerLegends = _.find(this.state.layersLegends, {'id': layer.id});
          if (!layerLegends){
            added = false;
            layerLegends = {'id': layer.id, 'layerTitle': layer.title, "legendGroups": []};
          }
          var legendGroup = {};
          _.assign(legendGroup, {"layerName": legends.name});
          _.assign(legendGroup, {"legends": this._parseLegendsFromDrawInfo(legends)}); 
          layerLegends.legendGroups.push(legendGroup);
          if (!added){
            this.state.layersLegends.push(layerLegends);
          }
        } else {
          var layerLegends = {'id': layer.id, 'layerTitle': layer.title, "legendGroups": []};
          legends.layers.map(function(layer){
            var legendGroup = {};
            _.assign(legendGroup, {"layerName": layer.layerName});     
            _.assign(legendGroup, {"legends": layer.legend});
            layerLegends.legendGroups.push(legendGroup);                 
          });
          this.state.layersLegends.push(layerLegends);
        }
        this.trigger(this.state);
    },

    onIsShown: function(value){
      this.update({ shown: value });
    },

    _addLegends: function() {
      console.log('stores->legendStore>_addLegends'); 
      this._addTotalProjectsLegend("activities");
      this._addFundingByTypeLegend("fundingUS");
      
      this.trigger(this.state);      
    },

    _addTotalProjectsLegend: function(legendId) {
      var layerLegends = _.find(this.state.layersLegends, {'id': legendId});
      if (!layerLegends){
        var legendGroup = {};
        layerLegends = {'id': legendId, 'layerTitle': "Proyectos Totales", 'visible': true, "legendGroups": []};
        var breaks = PointsLayerStore._getDefaultBreaks().breaks;
        var breaksKeys = Object.keys(breaks);
        var legendItems = [];
        for(var i=0; i<breaksKeys.length; i++){
          var legendItem = {};
          var level = breaksKeys[i];
          var labelStr = " " + breaks[level]["min"] + " - "+ breaks[level]["max"] ;
          var hexColor = this._rgbToHex(breaks[level]["style"]["color"]["r"], breaks[level]["style"]["color"]["g"], breaks[level]["style"]["color"]["b"]);
          _.assign(legendItem, {
            contentType: "image/png",
            height: 20,
            imageData: "iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAeFBMVEUAAAD/6dn3zZb/6tj/6tr62a//4sH/8eL/7Nv40Zn60Zn/7Nr/7Nz827X/7dz727T/7t3/793+797/5MT/8N7/8N//8d//8eD/8uH/8+L/8+P/9OP/9OT/9Ob/9un/9+v/+Oz/+O3/+vD//vf///n///v///7///8Zv8AlAAAAE3RSTlMALz1IYGxsbHiRkZGRqanC2tryzgePygAAAWRJREFUOMuNlF1XwjAQRC+W+gFYJQ7QYhotaOf//0MfCtJKQfYpJ7knO2d3dnE/vj5TLdWp+Rpcczp+J/UitSNQO0CG2BFqJGkVymob47Yqw1KSdkMoSVqXMeMQ81gGSakP1ZI2kUHEjaT6BCWtQvXYvWXT6eG/1zKsur/o9IRqAlAcpRYAkyp0urBbaVlNOoT8CZ7ye3sBTEpJrY2dpM0jYPcU2QZeN1Ky8bcUImDnfd25DcQgtcZJKoFiyMCzF0ApJWNpGQFzFgbiUjJ7KWRQjEELmAdpz0eXbYTh3l2+hiRVwF9FAPkDUEmJWtpC5rtzaOYM3qUaSRGmY+lwBlHSbdAx3exaumvCfRTeXC4BvyW4qZjulF9vy8UGv7g4Nbgdt8rLwCrjpmNouj/2ncEsf+tcPj/Z1ztp/d8g2Ela/zdStw3n75jPr425vestjPcLC+O21XOGjS4x2/a+OazD/eD6B2nTV9tIQvaeAAAAAElFTkSuQmCC",
            imageColor: hexColor,
            label: labelStr,
            url: "",
            width: 20});
          legendItems.push(legendItem);
        }
        _.assign(legendGroup, {"layerName": "Funding type"});
        _.assign(legendGroup, {"legends": legendItems});
        layerLegends.legendGroups.push(legendGroup);
        this.state.layersLegends.push(layerLegends);
      }

    },

    _rgbToHex: function(r, g, b){
      return "#"+this._toHex(r)+this._toHex(g)+this._toHex(b);
    },

    _toHex: function (n) {
       n = parseInt(n,10);
       if (isNaN(n)) return "00";
       n = Math.max(0,Math.min(n,255));
       return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
    },

    _addFundingByTypeLegend: function(legendId) {
      var layerLegends = _.find(this.state.layersLegends, {'id': legendId});
      if (!layerLegends){
        var legendGroup = {};
        layerLegends = {'id': legendId, 'layerTitle': "Financiamiento por tipo", 'visible': false, "legendGroups": []};
        var legendItems = [];

        var breaks = ShapesLayerStore._getDefaultBreaks().breaks;
        var breaksKeys = Object.keys(breaks);
        for(var i=0; i<breaksKeys.length; i++){
          var level = breaksKeys[i];
          var labelStr = " " + breaks[level]["min"] + " - "+ breaks[level]["max"] ;
          var rgbColor = [breaks[level]["style"]["color"]["r"], breaks[level]["style"]["color"]["g"], breaks[level]["style"]["color"]["b"]];
          var legendItem = {};
          _.assign(legendItem, {
            height: 10,
            label: labelStr,
            url: "",
            width: 10,
            symbol:{color:rgbColor, width:10, type:"esriSMS", style:"esriSMSSquare"}
          });
          legendItems.push(legendItem);
        }

        _.assign(legendGroup, {"layerName": "Colores"});
        _.assign(legendGroup, {"legends": legendItems});
        layerLegends.legendGroups.push(legendGroup);
        this.state.layersLegends.push(layerLegends);
      }

    },

    _setLegendColor: function(legendId, rgbColor, level) {
      var layerLegend = _.find(this.state.layersLegends, {'id': legendId});
      if(layerLegend){
        var legend = layerLegend.legendGroups[0].legends[level];
        if(legend.contentType=="image/png") {
          legend.imageColor = this._rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);
        } else {
          legend.symbol.color[0] = rgbColor.r;
          legend.symbol.color[1] = rgbColor.g;
          legend.symbol.color[2] = rgbColor.b;
        }
        this.trigger(this.state);
      }
    },

    onRemoveLegend: function(legendId) {
      var layerLegend = _.find(this.state.layersLegends, {'id': legendId});
      if (layerLegend){
        this.state.layersLegends.pop(layerLegend);
        this.trigger(this.state);
      }
    },

    _setLegendVisibility: function(legendId, value) {
      var layerLegend = _.find(this.state.layersLegends, {'id': legendId});
      if (layerLegend){
        layerLegend.visible = value;
      }
      this.trigger(this.state);
    },

    _parseLegendsFromDrawInfo: function(legends) {
      var legendArray = [];
      if (legends.drawingInfo.renderer.type == 'uniqueValue'){
        legends.drawingInfo.renderer.uniqueValueInfos.map(function(valueInfo){
          legendArray.push({"label": valueInfo.label, "symbol": valueInfo.symbol});          
        });
        return legendArray;            
      } else {
        var rdrr = legends.drawingInfo.renderer;
        legendArray.push({"label": rdrr.label, "symbol": rdrr.symbol});
        return legendArray;            
      }
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