'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var FilterActions = require('../actions/filterActions.js');
var FilterMap = require('../components/filters/filterMap.js');

module.exports=Reflux.createStore({

    listenables: FilterActions,

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
        switch(filterType) {
            case 'departaments':
                this.state[filterType] = data.data.GetDepartmentsListJsonResult;
                break;
            case 'municipalities':
                this.state[filterType] = data.data.GetMunicipalitiesListJsonResult;
                break;
        }
        this.output();
    },
    
    onChangeFilterItemState:function(filterType, id, value){
        this.state[filterType].filter(function(it){return it.id==id})[0].selected = value;
        this.output();
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