'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var InfoWindowActions = require('../actions/infoWindowActions.js');
var API = require('../api/infoWindow.js');

module.exports=Reflux.createStore({

    listenables: InfoWindowActions,
    // Initial setup
    init: function() {
        this.state = {};
        var self = this; 
    },

    onGetInfoFromAPI: function(infoDefinition, id) {
        console.log("stores->infoWindowStore: onGetInfoFromAPI");
        this.state[infoDefinition.key] = [];
        API.getInfoFromAPI(infoDefinition).then(
          function(data){
            InfoWindowActions.getInfoFromAPI.completed(data, id);
          }).fail(function(){
            console.log('infoWindowStore: Error loading data ...');
          });
    },

    onGetInfoFromAPICompleted: function(data, id){
        var self = this;
        data.map(function(node, index) {
            if(node.id == id){
                self.state['infoWindow'] = node.value;
            }
        });
        this.output();
    },

    getInfo: function(infoType) {
        console.log("stores->infoWindowStore: getInfo");
        if (this.state[infoType]) {
          return this.state[infoType];
        } else {
          return [];
        }    
    },

    // Callback
    output: function() {
    // Pass on to listening components
        this.trigger(this.serialize());
    },

    serialize: function() {
        return this.state;
    },

    getInitialState: function() {
       return this.serialize();
    }

});