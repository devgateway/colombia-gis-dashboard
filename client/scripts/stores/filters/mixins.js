'use strict';
var _ = require('lodash');
var assign = require('object-assign');
var Reflux = require('reflux');
var Util = require('../../api/util.js');

module.exports = {

	_initialized:false,

	onClean:function(){
		this.onUpdateAllSelection(false);
	},

	//TODO:FIX LOADING
	onRestoreData: function(savedData) {
		console.log('............. mixins.js -> onRestoreData');
		if (!this._initialized){ 
			this.load();	
		}
		if (this.state.items){
			this.state.items.map(function(i) {_.assign(i, {'selected': false})});//reset all filter selection
			if(savedData.filterData && savedData.filterData.filters){
				this.onUpdateAllSelection(false);
				_.forEach(savedData.filterData.filters, function(filter){
					if (filter.param === this.state.param){
						_.forEach(filter.values, function(value){
							_.assign(_.find(this.state.items, function(i){return i.id == value;}), {'selected': true});
						}.bind(this));
					}
				}.bind(this));
			}
			this.update({'items': _.clone(this.state.items)});
		}
	},

	onUpdateItemSelection: function(item, selected){
		_.assign(_.find(this.state.items, function(i){return i.id == item.id;}), {'selected': selected});
		this.update({'items': _.clone(this.state.items)});
	},	

	onUpdateAllSelection: function(selected){
		_.forEach(this.state.items, function(item){
			if (!item.hide){
				_.assign(item, {'selected': selected});
			}
		});
		this.update({'items': _.clone(this.state.items)});		
	},	

	onFilterByKeyword: function(keyword){
		var noResults = true;
		_.forEach(this.state.items, function(item){
			if (this._itemMatchs(item, keyword)){
				_.assign(item, {'hide': false});
				noResults = false;
			} else {
				_.assign(item, {'hide': true});	
			}
		}.bind(this));
		if (noResults){
			this.update({'items': _.clone(this.state.items), 'noResults': true});
		} else {
			this.update({'items': _.clone(this.state.items), 'noResults': false});
		}
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
	      return pattern.test(item.name);
	    } else {
	    	if (this.state.searchAndSelectMode){
	    		return false;
	    	} else {
	    		return true;
	    	}	      
	    }
	},

	_capitalize: function(items) {
		return _.map(items, function(i) {
			i.label = this._capitalizeStr(i.name);
			return i;
		}.bind(this));
	},

	_capitalizeStr: function(label) {
		var str = label.toLowerCase();
		if (!str || str.length==0){
			return "";
		}
		return str[0].toUpperCase() + str.replace(/ ([a-z])/g, function(a, b) {
			return ' ' + b.toUpperCase();
		}).slice(1);
	},

	_loadItems: function(url) {
		Util.get(url).then(function(data) {
			if (this.state.searchAndSelectMode){
				_.forEach(data, function(item){
					_.assign(item, {'hide': true});//hide the item by default					
				}.bind(this));
			}
			this.update({items: _.sortBy(this._capitalize(data), 'name'), loaded:true});
			this._initialized=true;
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
};