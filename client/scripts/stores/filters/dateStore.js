'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var actions=require('../../actions/filterActions.js').Dates;
var RestoreActions = require('../../actions/restoreActions.js');
var Mixins=require('./mixins.js');

module.exports = Reflux.createStore({

	listenables: [actions, RestoreActions],
	mixins: [Mixins],

	onUpdateItemValue:function(item, value){
		this.state[item] = value;
		var itemValue = {};
		itemValue[item] =  _.clone(this.state[item]);
		this.update(itemValue);
	},

	onRestoreData: function(savedData) {
		debugger;
	},

	onClean:function(){
		_.assign(this.state, {'sd': ''});
		_.assign(this.state, {'ed': ''});
		this.update(_.clone(this.state));
	},

	onLoadFromSaved: function(data){
		this.onClean();
		_.forEach(data.filters, function(filter){
			if (filter.param == 'sd'){
				_.assign(this.state, {'sd': filter.values});
			}
			if (filter.param == 'ed'){
				_.assign(this.state, {'ed': filter.values});
			}
		}.bind(this));	
		this.update(_.clone(this.state));	
	},
	
	init: function(){
		this.state = {};
		_.assign(this.state, {'sd': ''});
		_.assign(this.state, {'ed': ''});			
	}	
})
