'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var MapActions = require('../actions/mapActions.js');
var LoadingActions = require('../actions/loadingActions.js');

var CommonsMixins = require('./_mixins.js')

module.exports = Reflux.createStore({


  listenables: [MapActions, LoadingActions],
  mixins: [CommonsMixins],

  getCurrentBaseMap: function() {
    return this.state.baseMap;
  }, 

  onShowLoading: function() {    
    this.update({ loading: true });
  },

  onHideLoading: function() {    
    this.update({ loading: false });
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

  getInitialState: function() {
    return (this.state = {
      baseMap : 'Gray',
      bounds: [ [7, -62],
                [0, -83] ],
      loading: false,
      saveItems:['baseMap', 'bounds']          
    });
  }

});
