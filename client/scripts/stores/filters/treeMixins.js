'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Util = require('../../api/util.js');

module.exports = {
	_initialized: false,

	onLoad: function() {
		this._loadDataList(this.state.levels);
	},

	onRestoreData: function(savedData) {

		var callback = function() {
			this._initialized = true;
			this._restore(savedData);
		}.bind(this);
		if (!this._initialized) {
			this._loadDataList(this.state.levels, callback);
		} else {
			callback();
		}
	},

	_restore: function(savedData) {
		console.log('........... RESTORING DATA ...........');

		if (savedData.filterData && savedData.filterData.filters) {
			this.onUpdateAllSelection(false);
			_.forEach(savedData.filterData.filters, function(filter) {
				this._setSavedValues(this.state.levels, filter.param, filter.values);
			}.bind(this));
			
			this._createItemsTree();
			if(this.state.de){
				debugger;
			}
			this.trigger(this.state, true);
		}

	},
	_setSavedValues: function(level, param, values) {
		if (level.levelParam === param) {
			_.forEach(values, function(value) {
				_.assign(_.find(this.state[param], function(i) {
					return i.id == value;
				}), {
					'selected': true
				});
			}.bind(this));
		} else if (level.child) {
			this._setSavedValues(level.child, param, values);
		}
	},

	onClean: function() {
		this.onUpdateAllSelection(false);
	},

	onUpdateItemSelection: function(item, selected) {
		this._updateChildSelection(item, selected);
		this.trigger(this.state, true);
		this._createItemsTree();
	},

	onUpdateAllSelection: function(selected) {
		for (var key in this.state) {
			if (key !== 'itemsTree') {
				_.forEach(this.state[key], function(item) {
					_.assign(item, {
						'selected': selected
					});
				});
			}
		}
		this._createItemsTree();
	},

	onFilterByKeyword: function(keyword) {
		console.log('TreeMixin -> onFilterByKeyword: ' + keyword);
		this.update({
			'keyword': keyword
		});
		this._createItemsTree();
	},

	_capitalize: function(items) {
		return _.map(items, function(i) {
			i.label = this._capitalizeStr(i.name);
			return i;
		}.bind(this));
	},

	_capitalizeStr: function(label) {
		var str = label.toLowerCase();
		return str[0].toUpperCase() + str.replace(/ ([a-z])/g, function(a, b) {
			return ' ' + b.toUpperCase();
		}).slice(1);
	},

	_loadDataList: function(level, callback) {
		Util.get(window.DATA_PATH + level.sourcePath).then(function(data) {
			_.forEach(data, function(item) {
				_.assign(item, {
					'level': level.levelParam
				}); //assign level to each item
				_.assign(item, {
					'cid': item.id + '#' + item[level.parentIdField]
				}); //create a complex id (cid) for duplicated items with different parents
			});
			var stateList = {};
			stateList[level.levelParam] = _.sortBy(this._capitalize(data), 'name');
			this.update(stateList, {
				silent: true
			});

			if (level.child) {
				this._loadDataList(level.child, callback);
			} else {
				this._createItemsTree();
				if (callback) {
					callback();
				}
			}


		}.bind(this)).fail(function() {
			console.log('Failed to load data ');
		});
	},

	_createItemsTree: function() {
		var itemsTree = this._addTreeLevel(this.state.levels);
		if (this.state.keyword) {
			_.forEach(itemsTree, function(itemTree) {
				this._filterItemAndChildren(itemTree, this.state.keyword);
			}.bind(this));
		}
		if (_.filter(itemsTree, function(it) {
				return !it.hide;
			}).length == 0) {
			this.update({
				'itemsTree': itemsTree,
				'noResults': true
			});
		} else {
			this.update({
				'itemsTree': itemsTree,
				'noResults': false
			});
		}
	},

	_addTreeLevel: function(level) {
		var tree = this._createParentChildrenList(this.state[level.levelParam], this.state[level.child.levelParam], level.child.parentIdField);
		if (level.child.child) {
			_.assign(tree.nested, this._addTreeLevel(level.child));
		}
		return tree;
	},

	_createParentChildrenList: function(parentList, childrenList, parentIdField) {
		var itemsTree = [];
		_.forEach(parentList, function(parent) {
			var item = _.clone(parent);
			var children = _.clone(_.filter(childrenList, function(child) {
				return child[parentIdField] == parent.id;
			}), true);
			_.assign(item, {
				'nested': children
			});
			itemsTree.push(item);
		}.bind(this));
		return itemsTree;
	},

	_updateChildSelection: function(item, selected) {
		_.assign(_.find(this.state[item.level], function(e) {
			return e.cid == item.cid;
		}), {
			'selected': selected
		});
		if (item.nested) {
			_.forEach(item.nested, function(it) {
				this._updateChildSelection(it, selected);
			}.bind(this));
		}
	},

	_itemMatchs: function(item, keyword) {
		if (keyword.length > 1) {
			var pattern = new RegExp(keyword, 'i');
			return pattern.test(item.name);
		} else {
			return true;
		}
	},

	_filterItemAndChildren: function(item, keyword) {
		var itemMatchs = this._itemMatchs(item, keyword);
		var ret = false;
		if (itemMatchs) {
			_.assign(item, {
				'hide': false
			});
			this._makeChildrenVisible(item);
			ret = true;
		} else {
			_.assign(item, {
				'hide': true
			});
			_.forEach(item.nested, function(it) {
				if (this._filterItemAndChildren(it, keyword)) {
					_.assign(item, {
						'hide': false
					});
					ret = true;
				}
			}.bind(this));
		}
		return ret;
	},

	_makeChildrenVisible: function(item) {
		_.forEach(item.nested, function(it) {
			_.assign(it, {
				'hide': false
			});
			this._makeChildrenVisible(it);
		}.bind(this));
	},

	update: function(assignable, options) {
		options = options || {};
		this.state = _.assign(this.state || {}, assignable);
		if (!options.silent) {
			this.trigger(this.state);
		}
	}
};