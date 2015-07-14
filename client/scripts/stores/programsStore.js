'use strict';
var _ = require('lodash');

var assign = require('object-assign');

var Reflux = require('reflux');
var Util = require('../api/util.js');
var CommonsMixins = require('./_mixins.js');
var Actions = require('../actions/programsActions.js'); 

module.exports = Reflux.createStore({

  mixins: [CommonsMixins],

  listenables: Actions,

  init:function(){
    
  },


  onLoad: function(level) {

    Util.get(window.MOCK_PATH + '/programs.json').then(function(data) {
      this.update({programsList:data});
    }.bind(this)).fail(function() {
      console.log('Failed to load data ');
    });
  },

  getInitialState: function() {
    return (this.state = {});
  }

});