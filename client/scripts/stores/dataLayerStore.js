
'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var LayersAction = require('../actions/layersAction.js');
var Util= require('../api/util.js');
var API=require('../api/layers.js');

module.exports = Reflux.createStore({

  listenables: LayersAction,
  onLoadActivitiesByDepartments:function(){
    API.getActivitiesByDepartment(this.state.filters).then(
      function(data){
        LayersAction.loadActivitiesByDepartments.completed(data);
      }
      ).fail(function(){
        console.log('layersStore: Error loading data ...');
      })
    },

  onLoadActivitiesByDepartmentsCompleted:function(data){
    this.update({features:Util.toGeoJson(data)});
  },

  onLoadActivitiesByMuncipalitiesCompleted:function(data){
    this.update({features:Util.toGeoJson(data)});
  },

  onTriggerFilterApply:function(data){
    this.update({filters:data});
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