
'use strict';
var assign = require('object-assign');
var Reflux = require('reflux');
var SaveActions = require('../actions/saveActions.js');

module.exports = Reflux.createStore({

  listenables: SaveActions,
  onSaveMap:function(){
   console.log("stores->saveStore->onSaveMap");

  },

  update: function(assignable, options) {
    options = options || {};
    this.state = assign(this.state, assignable);
    if (!options.silent) {
      this.trigger(this.state);
    }
  },

  getInitialState: function() {
    return (this.state = {});
  }

});