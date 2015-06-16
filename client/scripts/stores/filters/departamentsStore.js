'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins=require('./mixins.js');
module.exports = Reflux.createStore({

	mixins: [Mixins],

	load:function(){
	
			this._loadItems(window.DATA_PATH + '/departmentList.json');
		
	},

})
