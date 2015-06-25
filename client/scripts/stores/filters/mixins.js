'use strict';
var _ = require('lodash');
var assign = require('object-assign');
var Reflux = require('reflux');
var Util = require('../../api/util.js')

module.exports = {

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
		if(!this._loaded){
			this._loaded==true;
			Util.get(url).then(function(data) {
				this.update({items: this._capitalize(data),loaded:true});
			}.bind(this)).fail(function() {
				console.log('Failed to load data ');
			});
		}
	},

	onAdd:function(id){
		var list=this.state.selected;
		if (!list){
			this.state.selected=[id];		
		}else{
			console.log('push id');
			this.state.selected.push(id)		
		}
		this.trigger(this.state.selected, true);
	},
	
	onRemove:function(id){
		_.remove(this.state.selected,function(value){
			return value===id;
		} );
		this.trigger(this.state.selected, true);
	},

	clean:function(){
		if (this.state){
			this.state.selected=[];
			this.trigger(this.state.selected, true);
		}
	},

	update: function(assignable, options) {
		options = options || {};
		this.state = _.assign(this.state || {}, assignable);
		if (!options.silent) {
			this.trigger(this.state);
		}
	},

	getInitialState: function() {
		return ({selected:[]});
	}

}