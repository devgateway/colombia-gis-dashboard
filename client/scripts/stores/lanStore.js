'use strict';

var _ = require('lodash');
var assign = require('object-assign');
var Reflux = require('reflux');
var LanActions = require('../actions/lanActions.js');

var CommonsMixins = require('./_mixins.js')

module.exports = Reflux.createStore({

  listenables: LanActions,
  mixins: [CommonsMixins],

  onChangeLocale:function(lan){
    this.update({'lan':lan});
  },

  update: function(assignable, options) {
    window.i18n.setLng(assignable.lan);
    options = options || {};
    this.state = _.assign(this.state, assignable);
    if (!options.silent) {
       this.trigger(this.state);
    }
  },

  getInitialState: function() {
    return (this.state = {"lan":"es", "saveItems":["lan"]});
  }

});