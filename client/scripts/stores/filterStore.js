'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var FilterActions = require('../actions/filterActions.js');
var FilterMap = require('../components/filters/filterMap.js');

module.exports=Reflux.createStore({

    listenables: FilterActions,
    // Initial setup
    init: function() {
        this.state = {};
        var self = this;
        var filters = FilterMap.filters;
        filters.map(function(item, idx){ 
            self.state[item.key] = [];
        });
        
    },

    getAll: function(filterType) {
        if (this.state[filterType]) {
          return this.state[filterType];
        } else {
          return [];
        }    
    },

    getItem: function(filterType, id) {
        if (this.state[filterType]) {
          return this.state[filterType].filter(function (data) {return (data.id === id);});
        } else {
          return [];
        }
    },

    getAllSelected: function(filterType) {
        if (this.state[filterType]) {
          return this.state[filterType].filter(function (data) {return (data.selected);});
        } else {
          return [];
        }
    },

    onGetListFromAPICompleted: function(data){
        var filterType = data.filter.key;
        this.state[filterType] = data.data[Object.keys(data.data)[0]];//TODO: change when the response field is generic        
        this.output();
    },
    
    onChangeFilterItemState:function(filterType, id, value){
        this.state[filterType].filter(function(it){return it.id==id})[0].selected = value;
        this.output();
    },

    onTriggerFilterApply:function(reset){
        var self = this;
        var filters = FilterMap.filters;
        var filtersSelected = {};
        filters.map(function(filterDefinition){ 
            var selectedIds = []
            var itemList = self.state[filterDefinition.key];
            itemList.map(function(item){ 
                if (reset){
                    item.selected = false;
                } else {
                    if (item.selected){
                        selectedIds.push(item.id);
                    }
                }
            });
            if (selectedIds.length>0){
                filtersSelected[filterDefinition.param] = selectedIds;
            }
        });
        this.state.filtersSelected = filtersSelected;
        this.output();
    },

    onTriggerFilterReset:function(){        
        this.onTriggerFilterApply(true);
    },

    // Callback
    output: function() {
    // Pass on to listening components
        this.trigger(this.serialize());
    },

    serialize: function() {
        return this.state;
    },

    getInitialState: function() {
       return this.serialize();
    }

});