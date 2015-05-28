
'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var LegendActions = require('../actions/legendActions.js');
var API = require('../api/esri.js');
var _ = require('lodash');

module.exports=Reflux.createStore({

    listenables: LegendActions,
    // Initial setup
    init: function() {
       this.state = {layersLegends: []};         
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
    }

});