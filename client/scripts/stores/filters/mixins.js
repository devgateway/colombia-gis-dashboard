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
		Util.get(url).then(function(data) {
				debugger;
			this.update({items: this._capitalize(data)});
			
			}.bind(this)).fail(function() {
			console.log('Failed to load data ');
		});
	},

	update: function(assignable, options) {
		debugger;
		options = options || {};
		this.state = _.assign(this.state || {}, assignable);
		
		if (!options.silent) {
			this.trigger(this.state);
		}
	},

	
}