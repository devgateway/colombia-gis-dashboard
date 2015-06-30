'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var MapActions = require('../actions/mapActions.js');
var LoadingActions = require('../actions/loadingActions.js');

var CommonsMixins = require('./_mixins.js');

var defaultZoom = 6;

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

  onChangeBounds: function(newBounds, newZoom) {
    var varZoom = newZoom?newZoom:defaultZoom;
    this.update({ bounds: newBounds, zoom: varZoom});
  },

  onChangeBoundsUser: function(newBounds, newZoom) {
    var varZoom = newZoom?newZoom:defaultZoom;
    this.update({ bounds: newBounds, zoom: varZoom}, { silent: true });
  },

  onChangeBaseMap:function(newBaseMap){
    this.update({baseMap:newBaseMap});
  },

  getInitialState: function() {
    return (this.state = {
      baseMap : 'Gray',
      bounds: [ [7, -62],
                [0, -83] ],
      zoom:defaultZoom,
      loading: false,
      saveItems:['baseMap', 'bounds', 'zoom']          
    });
  }

});
