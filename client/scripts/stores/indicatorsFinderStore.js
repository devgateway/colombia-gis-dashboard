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
    this.update({showNoResults: false});
    API.getIndicatorsList(this.state.query).then(function(data) {
      this.update({results:data, showLoading: false});
      if (!data.indicators || data.indicators.length===0){
        this.update({showNoResults: true});
      }    
    }.bind(this)).fail(
      function(xhttp,err){
        console.log(err);
      }
    );
  },

  onUpdateIndicator:function(indicator, activityId){
    this.update({'indicatorSelected': indicator, 'activitySelected': activityId});
    this.trigger(this.state);
  },

  onGetActivitiesByProgram: function(value){
    var filters = {'filters':[{'id':value}]};
    this.update({'results':{indicators:[]}}, {'silent': true});
    API.getActivityList(filters).then(function(data) {
      this.update({activities:data, showLoading: false});
      }.bind(this)).fail(
      function(xhttp,err){
        console.log(err);
      }
    );
  },

  onUpdateQuery: function(filter,value){
    var query=_.clone(this.state.query);
    value = Array.isArray(value)? value : [value]; //'values' in query should be an array
    var param = _.find(query, {'param': filter});
    if (param){
      param.values = value;
    } else {
      query.push({'param': filter, 'values': value});
    }
    _.assign(this.state.query,query);
    this.trigger(this.state);
  },

  onLoad: function(level) {
    this.loadPrograms();
    this.loadTypes();
  },

  loadTypes:function(){
    API.getTypeList().then(
      function(data){
        this.update({types:data});
      }.bind(this)
    ).fail(
      function(xhttp,err){
        console.log(err);
      } 
    );
  },

  loadPrograms:function(){
    Util.get(window.LIST_SOURCE_PROGRAMS).then(
      function(data){
        debugger;
        this.update({programs:data});
      }.bind(this)
    ).fail(
      function(xhttp,err){
        console.log(err);
      } 
    );
  },

  getInitialState: function() {
    return (
      this.state = { 
        'indicatorSelected': {},
        query: [
          {'param':'pr','values':[]},
          {'param':'t','values':[]},
          {'param':'k','values':[]},
          {'param':'page','values':[1]},
          {'param':'size','values':[10]}
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