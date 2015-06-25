'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var Mixins=require('./mixins.js');
var actions=require('../../actions/filterListActions.js').Locations;
var Util = require('../../api/util.js')

module.exports = Reflux.createStore({
	listenables: actions,
	mixins: [Mixins],
	load:function(){
		this._loadMunicipalities();
	},

	_loadMunicipalities: function(url) {
		Util.get(window.DATA_PATH + '/municipalitiesList.json').then(function(data) {
			_.forEach(data, function(item){_.assign(item, {'level': 'municipalities'});});//assign level to each item
			this.update({'municipalities': this._capitalize(data)}, {silent:true});
			this._loadDepartments();
		}.bind(this)).fail(function() {
			console.log('Failed to load data ');
		});
	},

	_loadDepartments: function(url) {
		Util.get(window.DATA_PATH + '/departmentList.json').then(function(data) {
			_.forEach(data, function(item){_.assign(item, {'level': 'departments'});});//assign level to each item
			this.update({'departments': this._capitalize(data)}, {silent:true});
			this._createItemsTree();
		}.bind(this)).fail(function() {
			console.log('Failed to load data ');
		});
	},

	_createItemsTree: function(){
		var itemsTree = [];
		_.forEach(this.state.departments, function(department){
			var item = _.clone(department);
			_.assign(item, {'nested': _.filter(this.state.municipalities, function(municipality){return municipality.idDepto==department.id})});
			itemsTree.push(item);
		}.bind(this));
		this.update({'itemsTree': itemsTree});				
	},	

	_updateChildSelection: function(item, selected){
		_.assign(_.find(this.state[item.level], function(e){return e.id == item.id}), {'selected': selected});
		if (item.nested){
			_.forEach(item.nested, function(it){
				this._updateChildSelection(it, selected);
			}.bind(this));
		}			
	},	

	_itemMatchs: function(item, keyword) {
	    if (keyword.length > 1) {
	      var pattern = new RegExp(keyword, 'i');
	      return pattern.test(item.name)
	    } else {
	      return true;
	    }
	},

	_filterItemAndChildren: function(item, keyword){
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
	},
	
	updateItemSelection: function(item, selected){
		this._updateChildSelection(item, selected);
		this._createItemsTree();			
	},	

	updateAllSelection: function(selected){
		_.forEach(this.state.departments, function(item){
			_.assign(item, {'selected': selected});
		});
		_.forEach(this.state.municipalities, function(item){
			_.assign(item, {'selected': selected});
		});
		this._createItemsTree();			
	},	

	filterByKeyword: function(keyword){
		_.forEach(this.state.itemsTree, function(itemTree){
			this._filterItemAndChildren(itemTree, keyword);		
		}.bind(this));
		this.update({'itemsTree': _.clone(this.state.itemsTree)});	
	},

	getState: function(){
		return this.state;
	}	

})
