'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Util = require('../../api/util.js');

module.exports = {

	onLoad:function(){
		this._loadDataList(this.state.levels);
	},

	onRestoreData: function(savedData) {
    	if(savedData.filterData && savedData.filterData.filters){
			this.onUpdateAllSelection(false);
			_.forEach(savedData.filterData.filters, function(filter){
				this._setSavedValues(this.state.levels, filter.param, filter.values);			
			}.bind(this));	
			//this._createItemsTree();
		}
	},

	_setSavedValues: function(level, param, values){
		if (level.levelParam == param){
			_.forEach(values, function(value){
				_.assign(_.find(this.state[param], function(i){return i.id == value}), {'selected': true});
			}.bind(this))
		} else if (level.child){
			this._setSavedValues(level.child, param, values);
		}
	},
	
	onClean: function(){
		this.onUpdateAllSelection(false);
	},

	onUpdateItemSelection: function(item, selected){
		this._updateChildSelection(item, selected);
		this.trigger(this.state, true);
		//this._createItemsTree();			
	},	

	onUpdateAllSelection: function(selected){
		/*for (var key in this.state) {
			if (key != "itemsTree"){
				_.forEach(this.state[key], function(item){
					_.assign(item, {'selected': selected});
				});
			}
		}*/
		//this._createItemsTree();			
	},	

	onFilterByKeyword: function(keyword){
		for (var key in this.state) {
			_.forEach(this.state[key], function(item){
				if (this._itemMatchs(item, keyword)){
					_.assign(item, {'hide': false});
				} else {
					_.assign(item, {'hide': true});
				}			
			}.bind(this));
		}
		//this.trigger(this.state, true);
		this.update({'update': !this.state.update});
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

	_loadDataList: function(level, parentParam) {
		Util.get(window.DATA_PATH + level.sourcePath).then(function(data) {
			_.forEach(data, function(item){
				_.assign(item, {'level': level.levelParam, 'hide': true});//assign level to each item, and hide it
				if (parentParam){
					var parentsTrace = this._getParentsTrace(item[level.parentIdField], parentParam);
					_.assign(item, {'parentsTrace': parentsTrace});
				}
			}.bind(this));
			var stateList = {};
			stateList[level.levelParam] = _.sortBy(this._capitalize(data), 'name');
			this.update(stateList);
			
			if (level.child){
				this._loadDataList(level.child, level.levelParam);
			}
		}.bind(this)).fail(function() {
			console.log('Failed to load data ');
		});
	},

	_getParentsTrace: function(parentId, parentParam){
		var parent = _.find(this.state[parentParam], function(e){return e.id == parentId});
		var parentsTrace = _.clone(parent.parentsTrace) || [];
		parentsTrace.push(parent.name);
		return parentsTrace;
	},

	/*
	_createItemsTree: function(){
		this.update({'itemsTree': this._addTreeLevel(this.state.levels)});
	},

	_addTreeLevel: function(level){
		debugger;
		var tree = this._createParentChildrenList(this.state[level.levelParam], this.state[level.child.levelParam], level.child.parentIdField);
		if (level.child.child){
			_.assign(tree.nested, this._addTreeLevel(level.child));
		}	
		return tree;		
	},	

	_createParentChildrenList: function(parentList, childrenList, parentIdField){
		var itemsTree = [];
		_.forEach(parentList, function(parent){
			var item = _.clone(parent);
			var children = _.clone(_.filter(childrenList, function(child){return child[parentIdField]==parent.id}), true);
			_.assign(item, {'nested': children});
			itemsTree.push(item);
		}.bind(this));
		return itemsTree;				
	},	
	*/
	_updateChildSelection: function(item, selected){
		_.assign(_.find(this.state[item.level], function(e){return e.id == item.id}), {'selected': selected});
		/*if (item.nested){
			_.forEach(item.nested, function(it){
				this._updateChildSelection(it, selected);
			}.bind(this));
		}*/		
	},	

	_itemMatchs: function(item, keyword) {
	    if (keyword.length > 1) {
	      var pattern = new RegExp(keyword, 'i');
	      return pattern.test(item.name)
	    } else {
	      return false;
	    }
	},

	/*_filterItemAndChildren: function(item, keyword){
		var itemMatchs = this._itemMatchs(item, keyword);
		var ret = false;
		if (itemMatchs){
			_.assign(item, {'hide': false});
			this._makeChildrenVisible(item);
			ret = true;
		} else {
			_.assign(item, {'hide': true});
			_.forEach(item.nested, function(it){
				if (this._filterItemAndChildren(it, keyword)){
					_.assign(item, {'hide': false});
					ret = true;
				}		
			}.bind(this));
		}			
		return ret;	
	},
	
	_makeChildrenVisible: function(item){
		_.forEach(item.nested, function(it){
			_.assign(it, {'hide': false});
			this._makeChildrenVisible(it);	
		}.bind(this));
	},*/

	update: function(assignable, options) {
		options = options || {};
		this.state = _.assign(this.state || {}, assignable);
		if (!options.silent) {
			this.trigger(this.state);
		}
	}
}
