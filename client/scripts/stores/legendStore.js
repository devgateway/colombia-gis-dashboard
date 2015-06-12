
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

       this._addInitialLegends();

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
      if(data.latestChange && data.latestChange.property == "addLayer"){ 
        this._addNewLegend(data.latestChange.value)
      } else if(data.latestChange && data.latestChange.property == "deleteLayer"){
        this._removeLegend(data.latestChange.value);
      } else if(data.latestChange && data.latestChange.property == "visible"){ 
        this._setLegendVisibility(data.latestChange.value.id, data.latestChange.value.visible);
      }
    },

    _addNewLegend: function(layer) {
      var layerLegends = _.find(this.state.layersLegends, {'id': layer.id});
      if (!layerLegends){
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
      }
    },

    onGetLegends: function(layer) {
      this._getLegends(layer);
    },

    onGetLegendsCompleted: function(legends, layer){
      var layerLegends = _.find(this.state.layersLegends, {'id': layer.id});
      if (layer.type=='Feature Service'){
          var added = true;
          if (!layerLegends){
            added = false;
            layerLegends = {'id': layer.id, 'layerTitle': layer.title, 'visible': true, "legendGroups": []};
          }
          var legendGroup = {};
          var subLayerLegend = _.find(layerLegends.legendGroups, {'layerName': legends.name});
          if (!subLayerLegend){
            _.assign(legendGroup, {"layerName": legends.name});
            _.assign(legendGroup, {"legends": API.parseLegendsFromDrawInfo(legends)}); 
            layerLegends.legendGroups.push(legendGroup);
            if (!added){
              this.state.layersLegends.push(layerLegends);
            }
          }
        } else {
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

    _addInitialLegends: function() {
      console.log('stores->legendStore>_addInitialLegends'); 
      this._addTotalProjectsLegend();
      this._addFundingByTypeLegend();
      
      this.trigger(this.state);      
    },

    _addTotalProjectsLegend: function() {
      var points = PointsLayerStore._getDefaultBreaks();
      var layerLegends = _.find(this.state.layersLegends, {'id': points.field});
      if (!layerLegends){
        layerLegends = {'id': points.field, 'layerTitle': "SubActividades Totales", 'visible': true, "legendGroups": []};
        var breaks = points.breaks;
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
            imageData: "iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0RGRUE0QTUwMjk5MTFFNTg0RTVCM0EwMUE0NzUyREQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0RGRUE0QTYwMjk5MTFFNTg0RTVCM0EwMUE0NzUyREQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3REZFQTRBMzAyOTkxMUU1ODRFNUIzQTAxQTQ3NTJERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3REZFQTRBNDAyOTkxMUU1ODRFNUIzQTAxQTQ3NTJERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp75SXYAAAC3UExURQAAAP/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/w3v/x4P/w3v/x4f/69f/8+P/69f/w3v/w3//26//37f/w3v/w3v/w3v/y4v/w3v/w3//x4P/w3v/w3//x3//x4P/x4f/y4//05v/27P/37P/37f/69f/79f/8+f/9+//+/v///v///+HvFC0AAAAsdFJOUwACBgcRHiIqLS4wPE1OXmVoao6Pmaiwx8vi5O3u7u/w9Pf39/f5+vz8/f7+Etve7wAAAYhJREFUOMuNlNd22zAQRIeSqUr1rihx5CLG8qV6YcH/f1ceZFlUSYh5wgHuwdkFdkbmouSw26yA1WZ3SFL7Rt+raPvJRS+v0T0U7wOu5b/FN1C4Bhh1aoWccoVaZwTwI7yCjnNg6Dk6y/GGwPvvFHQMYNq6IJLktKbg//qGwjmMy6ejklf3Sie8PIb35y8oXsPYlaRidwLApFuUJHcMP+MTtIdpWVK+7c/6zWql2uzP/HZeUnkKb8YYmSiAlqSnAT33qyC3x+BJUgv8yBiZLQwdKT/4aKTqbnwM8pIzhFdjlCzBk9SmcdVdg7YkD14SowOMHKno93Stnl+UnBEcjHbQkdSduTeQO+tK6sDOaAM1yZn0dav+xJFqsDFaQUEq0byDmpSkAqyMgJzkUb2DqnhSDjACJNWp3EEV6pLOUPZNVjVZdWf1TlYvnvl3n4nFFGwt5imILCZzbzHjf+KzWxb/dMs8zPZdcEw7ePHQwYtjdhasw8xUCfbxo3xappDlNnoUYlZJ9x/9BbJVjkkfQXN4AAAAAElFTkSuQmCC",
            imageColor: hexColor,
            label: labelStr,
            url: "",
            width: 20});
          legendItems.push(legendItem);
        }
        var legendGroup = {};
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

    _addFundingByTypeLegend: function() {
      var shapes = ShapesLayerStore._getDefaultBreaks();
      var layerLegends = _.find(this.state.layersLegends, {'id': shapes.field});
      if (!layerLegends){
        layerLegends = {'id': shapes.field, 'layerTitle': "Financiamiento por tipo", 'visible': false, "legendGroups": []};
        var breaks = shapes.breaks;
        var breaksKeys = Object.keys(breaks);
        var legendItems = [];
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
        var legendGroup = {};
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

    _removeLegend: function(legendId) {
      var index = _.indexOf(_.pluck(this.state.layersLegends, 'id'), legendId);;
      if (index>=0){
        this.state.layersLegends.splice(index, 1);
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