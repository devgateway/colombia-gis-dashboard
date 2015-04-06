
'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var LayersAction = require('../actions/layersAction.js');
var Util= require('../api/util.js');

module.exports = Reflux.createStore({

  listenables: LayersAction,

  onTriggerFilterApply:function(filter){
    alert("Filters Applied: "+ JSON.stringify(filter));
  },

  onLoadActivitiesByDepartmentsCompleted:function(data){
     this.update({features:Util.toGeoJson(data)});
  },

  onLoadActivitiesByMuncipalitiesCompleted:function(data){
      this.update({features:Util.toGeoJson(data)});
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
