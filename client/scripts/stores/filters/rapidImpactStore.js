'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins=require('./mixins.js');
var actions=require('../../actions/filterListActions.js').RapidImpact;


module.exports = Reflux.createStore({

	listenables: actions,

	mixins: [Mixins],

	load:function(){

		this._loadItems(window.DATA_PATH + '/rapidImpact.json');
		
	},

})
