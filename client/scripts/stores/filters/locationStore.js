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
		//if(!this._loaded){
			//this._loaded==true;
			Util.get(window.DATA_PATH + '/municipalitiesList.json').then(function(data) {
				_.forEach(data, function(item){_.assign(item, {'level': 'municipalities'});});//assign level to each item
				this.update({'municipalities': this._capitalize(data)}, {silent:true});
				this._loadDepartments();
			}.bind(this)).fail(function() {
				console.log('Failed to load data ');
			});
		//}
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

	updateItemSelection: function(level, id, selected){
		_.assign(_.find(this.state[level], function(e){return e.id == id}), {'selected': selected});
		this._createItemsTree();			
	},	
	
	getState: function(){
		return this.state;
	}	

})
