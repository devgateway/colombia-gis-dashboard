'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var _ = require('lodash');
var actions=require('../../actions/filterActions.js');
var Mixins=require('./aggregatorMixins.js');

module.exports = Reflux.createStore({

		mixins: [Mixins],
	listenables: [actions],

	_collectFilters:function(params, isTree){

		if (!isTree){
			return function(value){
					
				if (_.isArray(params)){
					_.forEach(params, function(param){
						this.state[param] = _.isArray(value)? _.map(_.filter(value[param].items, function(it){return it.selected}), 'id'): [value[param]];
					}.bind(this));
				} else {
					this.state[params] = _.map(_.filter(value.items, function(it){return it.selected}), 'id');
				} 
			}
		} else {
			return function(value){
						
				_.forEach(params, function(param){
					this.state[param] =  _.map(_.filter(value[param], function(it){return it.selected}), 'id');
				}.bind(this));				
			}
		}
	},


	_translate:function(){
		var filters = [];
		for (var key in this.state) {
			if (this.state.hasOwnProperty(key) && this.state[key].length>0 && this.state[key][0]!=""){
			  	var selection = {'param': key, 'values': this.state[key]};
			    filters.push(selection);
			}
		}
		return filters;
	},

	onApplyFilters:function(){
		this.trigger(this._translate());		
	},



	getInitialState: function() {
		return (this.state = {});
	}
})
