
'use strict';
var assign = require('object-assign');
var Reflux = require('reflux');
var LanActions = require('../actions/lanActions.js');

module.exports = Reflux.createStore({

  listenables: LanActions,
  onChangeLocale:function(lan){
    window.i18n.setLng(lan);
    this.update({'lan':lan});

  },

  update: function(assignable, options) {
    options = options || {};
    this.state = assign(this.state, assignable);
    if (!options.silent) {
      this.trigger(this.state);
    }
  },

  getInitialState: function() {
    return (this.state = {locale:'en'});
  }

});