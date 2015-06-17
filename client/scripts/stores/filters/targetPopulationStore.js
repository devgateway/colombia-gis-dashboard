'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins=require('./mixins.js');
var actions=require('../../actions/filterListActions.js').TargetPopulation;

module.exports = Reflux.createStore({
	
	listenables: actions,
	
	mixins: [Mixins],

	onLoad:function(){
		console.log('load');
		this._loadItems(window.DATA_PATH + '/targetPopulation.json');
	},



})
