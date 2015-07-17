'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var actions=require('../../actions/filterActions.js').ValueRange;
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
		if(savedData.filterData && savedData.filterData.filters){
			_.forEach(savedData.filterData.filters, function(filter){
				if (filter.param == 'vr1'){
					_.assign(this.state, {'vr1': filter.values[0]});
				}
				if (filter.param == 'vr2'){
					_.assign(this.state, {'vr2': filter.values[0]});
				}
			}.bind(this));
			this.update(_.clone(this.state));
		}	
	},

	onClean:function(){
		_.assign(this.state, {'vr1': ''});
		_.assign(this.state, {'vr2': ''});
		this.update(_.clone(this.state));
	},

	onLoadFromSaved: function(data){
		this.onClean();
		_.forEach(data.filters, function(filter){
			if (filter.param == 'vr1'){
				_.assign(this.state, {'vr1': filter.values});
			}
			if (filter.param == 'vr2'){
				_.assign(this.state, {'vr2': filter.values});
			}
		}.bind(this));	
		this.update(_.clone(this.state));	
	},
	
	init: function(){
		this.state = {};
		_.assign(this.state, {'vr1': ''});
		_.assign(this.state, {'vr2': ''});			
	}	
})
