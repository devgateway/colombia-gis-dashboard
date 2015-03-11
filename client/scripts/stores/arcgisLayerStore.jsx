'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var ExternalLayersActions = require('../actions/externalLayersActions.js');
var API= require('../api/util.js');

module.exports = Reflux.createStore({

  listenables: ExternalLayersActions,

  onSearchOnArcGisCompleted:function(data){
     this.update({all:data.results});
  },

  onAddLayerToMap:function(servideMetadata){
    debugger;
      this.state.current.push(servideMetadata);
      this.trigger(this.state);
  },

  onToggleLayerVisibility:function(){
    alert("onToggleLayerVisibility");
  },

  onRemoveLayer:function(){
      alert("onRemoveLayer");
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
          layers:[],
          current:[],
          all:[]
    });
  }

});
