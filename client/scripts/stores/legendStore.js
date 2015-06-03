
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
        debugger;
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

    onGetDataLayersLegends: function() {
      console.log('stores->legendStore>onGetDataLayersLegends'); 
      this._addTotalProjectsLegend(0);
      this._addFundingByTypeLegend(1);
      
      this.trigger(this.state);      
    },

    _addTotalProjectsLegend: function(legendId) {
      var legendItem = {};
      var legendGroup = {};
      var layerLegends = _.find(this.state.layersLegends, {'id': legendId});
      if (!layerLegends){
        layerLegends = {'id': legendId, 'layerTitle': "Proyectos Totales", "legendGroups": []};
        _.assign(legendItem, {
          contentType: "image/png",
          height: 20,
          imageData: "iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAffBgEPOwGNqO18AAAAB3RJTUUH3wYBDzsa0szH4AAAAAlwSFlzAAALEgAACxIB0t1+/AAAASNQTFRF7uTZ797L7+DP7+Xa7+bd7+jh8NW28NW38Na48Na58Ne68NrB8NzF8N3I8N7J8de68di78di88di98dm98dm+8tGz8tG08tS38tm98tm+886w89G09M+x9cOh9cSh9cuq9rqT97eO97eP97iR97qS97uT97uU97yV972Y976Z97+a+LVV+LaN+LeP+LiQ+LmS+LqT+L2Y+MB8+MB9+MCc+MKg+a06+a46+bNM+bNN+bVV+biQ+b11+b2Y+b51+b52+b6Z+cCc+cKf+cKg+cSj+cWk+cyh+qsw+seP+seQ+sip+smq+sqr+sqs+sut+suu+s2x+s6y+s+0+tC1+tG3+tK4+tO6+9S7+9W9+9a/+9fA+9fB+9jC+9jD+9nD/NfA////9BigdAAAAh9JREFUOMuNlH1XolAQxi+VgMouamaomZmuuZStttfXrBRD1iUDZV21ReX7f4odQFHEznH+gnt+Z2bOzPMMMrbj+CsTJMkgQxy7ntHm84Qht4Lx7YF8LsSNrSECXimKDoQj0WgkHKApCh6O3BCkoWiWu0jxN8Xidz4V41gaMGYbgm4pP5fOZctYqFQEXM7m0pwfqOAGYiBN6CxfwqKsqMOhqsgiLuXPoaidC9n90KHEfVtUtMlMn8/12URTxPJ1IkTbfQHkg1qhxB1+06Z6/+W2Vrt96evTkdy5SwSgos+CoJj/7B4Pxh+9hrSKRm/5Z9C5PvdbBZFxAsW4fPtt/K8lbcXzx1huX3G0mQqZidh0SdSWz5Irfi5H4o80a6ZCBnTE5bAy7Uk70ZsqOMdBVwZCUO0iK2p6Yxdq6KPXbBLqIfSFJAOpsjzpS5749ff30yVLkgSChYR5rMxaXqg1e8d8GJaDYCORG0HVm16oqatC4RR2Ay2R0WJlOK95odpC7WbiADhQ1QtVHeigcgc1Tnw+gr4zAmeY9V2mbg4zZg3zoLV8uuCHpSaW1gv2OVJxUQ+mVPJrqdiie7RE5/RV7y3Hg07REZ1bvq1mtdpsgXw1kG9yI1/jyDLC48oIi4VthHZx2wheS73Lrx5LOeb8Zpqz2xXw0x5zOjaPpfhCJlPgL5N7bG71tToY8fhpmN17MA47PR5s7xGz/4jVOXQ//wdC1BK7JpbuewAAAABJRU5ErkJggg==",
          label: "Cantidad de Proyectos",
          url: "",
          width: 20});

        _.assign(legendGroup, {"layerName": "Funding type"});
        _.assign(legendGroup, {"legends": [legendItem]});
        layerLegends.legendGroups.push(legendGroup);
        this.state.layersLegends.push(layerLegends);
      }

    },

    _addFundingByTypeLegend: function(legendId) {
      var layerLegends = _.find(this.state.layersLegends, {'id': legendId});
      if (!layerLegends){
        
        var legendGroup = {};
        layerLegends = {'id': legendId, 'layerTitle': "Tipo de Financiamiento", "legendGroups": []};

        var legendItems = [];
        var labelsAndColors = [["20", "FFAAAA"], ["40", "D46A6A"], ["60", "AA3939"], ["80", "801515"], ["100", "550000"]];
        for (var i=0; i<labelsAndColors.length;i++){
          var labelStr = " " + labelsAndColors[i][0] + "%";
          var hexColor = labelsAndColors[i][1];
          var legendItem = {};
          _.assign(legendItem, {
            height: 10,
            label: labelStr,
            url: "",
            width: 10,
            symbol:{color:this._hexToRgb(hexColor), width:10, type:"esriSMS", style:"esriSMSSquare"}
          });
          legendItems.push(legendItem);
        }

        _.assign(legendGroup, {"layerName": "Funding type"});
        _.assign(legendGroup, {"legends": legendItems});
        layerLegends.legendGroups.push(legendGroup);
        this.state.layersLegends.push(layerLegends);
      }

    },

    _hexToRgb: function(hex) {
      var bigint = parseInt(hex, 16);
      var r = (bigint >> 16) & 255;
      var g = (bigint >> 8) & 255;
      var b = bigint & 255;    
      return [r,g,b];
    },

    onRemoveLegend: function(legendId) {
      var layerLegends = _.find(this.state.layersLegends, {'id': legendId});
      if (layerLegends){
        this.state.layersLegends.pop(layerLegends);
        this.trigger(this.state);
      }
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