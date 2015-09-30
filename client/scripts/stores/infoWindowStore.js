'use strict';
var _=require('lodash');
var assign = require('object-assign');
var Reflux = require('reflux');
var Actions = require('../actions/infoWindowActions.js');
var API = require('../api/infoWindow.js');

module.exports=Reflux.createStore({

    listenables: Actions,
    // Initial setup
    init: function() {
        this.state = {};
    },

    onGetPointsFromAPI: function(infoWindowFilter, filters) {
        console.log('stores->infoWindowStore: onGetInfoFromAPI');
        this.update({'infoWindowFilter': infoWindowFilter, 'infoWindow': null});
        API.getInfoFromAPI(infoWindowFilter, filters).then(
          function(data){
            Actions.getPointsFromAPI.completed(data, filters);
        }).fail(function(){
          console.log('infoWindowStore: Error loading data ...');
        });
    },

    onGetPointsFromAPICompleted: function(data, filters){
        this.update({'infoWindow': _.sortBy(data, 'id')});
        this.output();
    },

    getInfo: function(infoType) {
        console.log('stores->infoWindowStore: getInfo');
        if (this.state[infoType]) {
          return this.state[infoType];
        } else {
          return [];
        }    
    },

    // Callback
    output: function() {
      this.trigger(this.serialize());
    },

    serialize: function() {
        return this.state;
    },

    getInitialState: function() {
       return this.serialize();
    },

    update: function(assignable, options) {
      options = options || {};
      this.state = assign(this.state, assignable);
      if (!options.silent) {
        this.trigger(this.state);
      }
    }

});