'use strict';
var _=require('lodash');
var assign = require('object-assign');
var Reflux = require('reflux');
var Actions = require('../actions/layersAction.js');
//var PointsLayerStore = require('./pointsLayerStore.js');

module.exports=Reflux.createStore({

    listenables: Actions,

    // Initial setup
    init: function() {
        this.state = {};
    },
    
    onShowNoResultsPopup: function(text) {
      this.update({'showModal': true, 'modalText': text});
    },

    // Callback
    output: function() {
      this.trigger(this.serialize());
    },

    serialize: function() {
        return this.state;
    },

    getInitialState: function() {
       return {showModal: false};
    },

    update: function(assignable, options) {
      options = options || {};
      this.state = assign(this.state, assignable);
      if (!options.silent) {
        this.trigger(this.state);
      }
    }

});