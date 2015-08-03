'use strict';
var _ = require('lodash');

var assign = require('object-assign');

var Reflux = require('reflux');
var Util = require('../api/util.js');
var API = require('../api/indicators.js');
var CommonsMixins = require('./_mixins.js');
var Actions = require('../actions/indicatorFinderActions.js'); 

module.exports = Reflux.createStore({

  mixins: [CommonsMixins],

  listenables: Actions,

  init:function(){},

  onFind:function(){
    console.log(this.state.query);
    API.getIndicatorsList(this.state.query).then(function(data) {
      this.update({results:data});
    }.bind(this)).fail(
      function(xhttp,err){
        console.log(err)
      }
    );
  },

  onUpdateIndicator:function(indicatorId, activityId){
    this.update({"indicatorSelected": indicatorId, "activitySelected": activityId});
    this.trigger(this.state);
  },

  onGetActivitiesByProgram: function(value){
    var filters = {"filters":[{"id":value}]};
    API.getActivityList(filters).then(function(data) {
      this.update({activities:data});
    }.bind(this)).fail(
      function(xhttp,err){
        console.log(err)
      }
    );
  },

  onUpdateQuery: function(filter,value){
    var query=_.clone(this.state.query)
    value = Array.isArray(value)? value : [value]; //"values" in query should be an array
    var param = _.find(query, {'param': filter});
    if (param){
      param.values = value;
    } else {
      query.push({"param": filter, "values": value});
    }
    _.assign(this.state.query,query);
    this.trigger(this.state);
  },

  onLoad: function(level) {
    this.loadPrograms();
    this.loadTypes();
  },

  loadTypes:function(){
    Util.get(window.MOCK_PATH + '/indicatorType.json').then(
      function(data){
        this.update({types:data})
      }.bind(this)
    ).fail(
      function(xhttp,err){
        console.log(err)
      } 
    );
  },

  loadPrograms:function(){
    Util.get(window.MOCK_PATH + '/programs.json').then(
      function(data){
        this.update({programs:data})
      }.bind(this)
    ).fail(
      function(xhttp,err){
        console.log(err)
      } 
    );
  },

  getInitialState: function() {
    return (
      this.state = { 
        query: [
          {"param":"pr","values":[]},
          {"param":"t","values":[]},
          {"param":"k","values":[]},
          {"param":"page","values":[1]},
          {"param":"size","values":[10]}
        ],
        filter:{
            indicator:undefined
          },
        'types':[],
        'programs':[],
        'results':{indicators:[]}, 
        'programsList':[]
      }
    );
  }

});