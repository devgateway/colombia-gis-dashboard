'use strict';
var _ = require('lodash');
var assign = require('object-assign');
var Reflux = require('reflux');
var API = require('../../api/filters.js')

module.exports = {

	init: function() {
		console.log('...................inti...............')
	},

	_capitalize: function(items) {
		return _.map(data, function(i) {
			i.label = this._capitalizeStr(i.label)
		});
	},

	_capitalizeStr: function(label) {
		str = label.toLowerCase();
		return str[0].toUpperCase() + str.replace(/ ([a-z])/g, function(a, b) {
			return ' ' + b.toUpperCase();
		}).slice(1);
	},

	_loadItems: function() {
		Util.get(this.state.dataSource).then(function(data) {

			this.update({
				items: this._capitalize(data)
			}); //capitalise items and trigger 

		}).fail(function() {
			console.log('Failed to load data ');
		});
	},

	update: function(assignable, options) {
		options = options || {};
		this.state = _.assign(this.state, assignable);
		if (!options.silent) {
			this.trigger(this.state);
		}
	},

	getInitialState: function() {
		return {
			label: '',
			modes: [],
			param: '',
			dataSource: '',
			items: [],
			selection: []
		}
	},
}