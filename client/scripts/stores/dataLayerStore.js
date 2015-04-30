'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var LayersAction = require('../actions/layersAction.js');
var Util = require('../api/util.js');
var API = require('../api/layers.js');

module.exports = Reflux.createStore({

  listenables: LayersAction,
  onLoadActivitiesByDepartments: function() {
    this.update({
      'dataLevel': 'departament',
      'dataLayer': 'funding'
    });
    API.getActivitiesByDepartment(this.state.filters).then(
      function(data) {
        LayersAction.loadActivitiesByDepartments.completed(data);
      }
    ).fail(function() {
      console.log('layersStore: Error loading data ...');
    })
  },

  onLoadActivitiesByMuncipalities: function() {
    this.update({
      'dataLevel': 'municipality',
      'dataLayer': 'funding'
    });
    API.getActivitiesByMuncipalities(this.state.filters).then(
      function(data) {
        LayersAction.loadActivitiesByMuncipalities.completed(data);
      }
    ).fail(function() {
      console.log('layersStore: Error loading data ...');
    })
  },

  onLoadIndicatorsByDepartments: function() {
    this.update({
      'dataLevel': 'departament',
      'dataLayer': 'indicator'
    });
  },

  onLoadIndicatorsByMuncipalities: function() {
    this.update({
      'dataLevel': 'municipality',
      'dataLayer': 'indicator'
    });
  },

  onLoadActivitiesByDepartmentsCompleted: function(data) {
    this.update({
      features: Util.toGeoJson(data)
    });
  },

  onLoadActivitiesByMuncipalitiesCompleted: function(data) {
    this.update({
      features: Util.toGeoJson(data)
    });
  },

  onTriggerFilterApply: function(data) {
    this.update({
      filters: data
    });
    if (this.state.dataLevel == 'departament') {
      this.onLoadActivitiesByDepartments();
    } else if (this.state.dataLevel == 'municipality') {
      this.onLoadActivitiesByMuncipalities();
    }
  },

  update: function(assignable, options) {
    options = options || {};
    this.state = assign(this.state, assignable);
    if (!options.silent) {
      this.trigger(this.state);
    }
  },

  getInitialState: function() {
    this.state = this.state || {
      dataLevel: "departament",
      dataLayer: "funding"
    };
    return this.state;
  }

});