
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
       this.state = {legends: []};         
    },

    onGetLegends: function(layer) {
        debugger;
        API.findLegends(layer.url).then(
          function(legends){
            LegendActions.getLegends.completed(legends, layer);
          }).fail(function(){
            console.log('legendStore: Error loading data ...');
          });
    },

    onGetLegendsCompleted: function(legends, layer){
        var legendObject = {"legends": legends.layers[0].legend};
        _.assign(legendObject,{'layerName': layer.title});
        if(legendObject.legends){
          this.state.legends.push(legendObject);
        }
        this.trigger(this.state);
    },

    getInitialState: function() {
       return this.state;
    }

});