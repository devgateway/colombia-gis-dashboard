'use strict';
var _ = require('lodash');

var assign = require('object-assign');

var Reflux = require('reflux');
var Util = require('../api/util.js');
var CommonsMixins = require('./_mixins.js');
var Actions = require('../actions/indicatorFinderActions.js'); 

module.exports = Reflux.createStore({

  mixins: [CommonsMixins],

  listenables: Actions,

  init:function(){},

  onFind:function(){
    console.log(this.state.query);
    Util.get(window.MOCK_PATH + '/indicators.json').then(function(data) {
      this.update({results:data});
    }.bind(this)).fail(
    function(xhttp,err){
      console.log(err)
    }
    );

  },



  onUpdateIndicator:function(indicator){
     console.log(indicator)
  },

  onUpdateQuery:function(filter,value){
    var query=_.clone(this.state.query)

    if (filter=='t'){
      if(value.selected){
        query[filter].push(value.value);
      }else{
        var values=query[filter];
        values.splice(values.indexOf(value.value));
        query[filter]=values;
      }
      
    }else{
      query[filter]=value;
      
    }

    _.assign(this.state.query,query);
    console.log(this.state.query);
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
    Util.get(window.MOCK_PATH + '/programs.json').then(function(data){
      this.update({programs:data})
    }.bind(this));
  },

  getInitialState: function() {
    return (
      this.state = { 
        query:{
          'pr':undefined, 
        't':[], //types
        'k':undefined,
        'page':1,
        'size': 10
      },
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