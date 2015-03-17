
'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var ArcgisLoginActions = require('../actions/arcgisLoginActions.js');

module.exports = Reflux.createStore({

  listenables: ArcgisLoginActions,

  getInitialState: function() {
    return (this.state = {token:null,});
  }

});
