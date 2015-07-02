'use strict';
var _ = require('lodash');
var assign = require('object-assign');
var Reflux = require('reflux');
var Util = require('../../api/util.js')

module.exports = {

	onClean:function(){
		this.onUpdateAllSelection(false);
	},

	onLoadFromSaved: function(data){
		this.onUpdateAllSelection(false);
		_.forEach(data.filters, function(filter){
			if (filter.param == this.state.param){
				_.forEach(filter.values, function(value){
					_.assign(_.find(this.state.items, function(i){return i.id == value}), {'selected': true});
				}.bind(this))
			}
		}.bind(this));		
	},

	onUpdateItemSelection: function(item, selected){
		_.assign(_.find(this.state.items, function(i){return i.id == item.id}), {'selected': selected});
		this.update({'items': _.clone(this.state.items)});
	},	

	onUpdateAllSelection: function(selected){
		_.forEach(this.state.items, function(item){
			_.assign(item, {'selected': selected});
		});
		this.update({'items': _.clone(this.state.items)});		
	},	

	onFilterByKeyword: function(keyword){
		_.forEach(this.state.items, function(item){
			if (this._itemMatchs(item, keyword)){
				_.assign(item, {'hide': false});
			} else {
				_.assign(item, {'hide': true});	
			}
		}.bind(this));
		this.update({'items': _.clone(this.state.items)});	
	},

	onSelectFilteredByKeyword: function(keyword){
		_.forEach(this.state.items, function(item){
			if (this._itemMatchs(item, keyword)){
				_.assign(item, {'selected': true});
			} 
		}.bind(this));
		this.update({'items': _.clone(this.state.items)});
	},

	_itemMatchs: function(item, keyword) {
	    if (keyword.length > 1) {
	      var pattern = new RegExp(keyword, 'i');
	      return pattern.test(item.name)
	    } else {
	      return true;
	    }
	},

	_capitalize: function(items) {
		return _.map(items, function(i) {
			i.label = this._capitalizeStr(i.name)
			return i;
		}.bind(this));
	},

	_capitalizeStr: function(label) {
		var str = label.toLowerCase();
		return str[0].toUpperCase() + str.replace(/ ([a-z])/g, function(a, b) {
			return ' ' + b.toUpperCase();
		}).slice(1);
	},

	_loadItems: function(url) {
		Util.get(url).then(function(data) {
			this.update({items: this._capitalize(data),loaded:true});
		}.bind(this)).fail(function() {
			console.log('Failed to load data ');
		});
	},
	
	update: function(assignable, options) {
		options = options || {};
		this.state = _.assign(this.state || {}, assignable);
		if (!options.silent) {
			this.trigger(this.state);
		}
	}
}