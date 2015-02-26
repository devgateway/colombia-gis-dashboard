'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var FilterActions = require('../actions/filterActions.js');

module.exports=Reflux.createStore({

    listenables: FilterActions,
    // Initial setup
    init: function() {
        this.state = {
            municipalities: [], departaments: [], developmentObjectives: [],
            municipalitiesSelected: [], departamentsSelected: [], developmentObjectivesSelected: []
        };
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

    onGetDepartamentsListCompleted: function(data){
        this.state.departaments = data.GetDepartmentsListJsonResult;
        this.output();
    },
    
    onGetMunicipalitiesListCompleted: function(data){
        this.state.municipalities = data.GetMunicipalitiesListJsonResult;
        this.output();
    },
    
    onChangeFilterItemState:function(filterType, id, value){
        this.state[filterType].filter(function(it){return it.id==id})[0].selected = value;
        /*this.state[filterType].map(function(item) {
            if (item.id == id) {
                item.selected = value;
            } 
        });*/
        this.output();
    },

    // Callback
    output: function() {
    // Pass on to listening components
        this.trigger(this.serialize());
    },

    serialize: function() {
        return this.state
    },

    getInitialState: function() {
       return this.serialize();
    }

});
