'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var actions=require('../../actions/filterListActions.js').Dates;
var Mixins=require('./mixins.js');

module.exports = Reflux.createStore({

	listenables: actions,
	mixins: [Mixins],

	onUpdateItemValue:function(item, value){
		this.state[item] = value;
		var itemValue = {};
		itemValue[item] =  _.clone(this.state[item]);
		this.update(itemValue);
	},

	onClean:function(){
		_.assign(this.state, {'sd': ''});
		_.assign(this.state, {'ed': ''});
		this.update(_.clone(this.state));
	},
	
	init: function(){
		this.state = {};
		_.assign(this.state, {'sd': ''});
		_.assign(this.state, {'ed': ''});			
	}	
})
