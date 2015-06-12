'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins=require('./mixins.js');
module.exports = Reflux.createStore({

	mixins: [Mixins],

	load:function(){
		  debugger;
		this._loadItems(window.DATA_PATH + '/targetPopulation.json');
	},

	getInitialState: function() {

		this.state= {
			label: '',
			modes: [],
			param: '',
			dataSource: '',
			items: [],
			selection: []
		}
	},

})