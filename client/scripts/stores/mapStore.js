'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var MapActions = require('../actions/mapActions.js');
var LoadingActions = require('../actions/loadingActions.js');


module.exports = Reflux.createStore({


  listenables: [MapActions, LoadingActions],

  getCurrentBaseMap: function() {
    return this.state.baseMap;
  }, 

  onUpdateLoading: function() {
    
    this.update({ loading: !this.state.loading });
  },

  onChangeBounds: function(newBounds) {
    this.update({ bounds: newBounds });
  },

  onChangeBoundsUser: function(newBounds) {
    this.update({ bounds: newBounds }, { silent: true });
  },

  onChangeBaseMap:function(newBaseMap){
    this.update({baseMap:newBaseMap});
  },

  update: function(assignable, options) {
    options = options || {};
    this.state = assign(this.state, assignable);
    if (!options.silent) {
      this.trigger(this.state);
    }
  },

  getInitialState: function() {
    return (this.state = {
      baseMap : 'Gray',
      bounds: [ [7, -62],
                [0, -83] ],
      loading: false          
    });
  }

});
