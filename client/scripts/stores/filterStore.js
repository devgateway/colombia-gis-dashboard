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
        //this.listenTo(FilterActions.getAllFilterListFromServer, this._getAllFilterList);
        //this.listenTo(FilterActions.getFilterListFromServer, this._getFilterList);
        //this.listenTo(FilterActions.receiveFilterListFromServer, this._receiveFilterList);
        //this.listenTo(FilterActions.changeFilterItemSelection, this._changeFilterItem);
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
          return this.state[filterType].filter(function (data) {   
                return (data.id === id);
              });
        } else {
          return [];
        }
    },

    getAllSelected: function(filterType) {
        if (this.state[filterType]) {
          return this.state[filterType].filter(function (data) {
                return (data.selected);
              });
        } else {
          return [];
        }
    },

    onGetFilterListFromServerCompleted: function(data){
        this.state.departaments = data.GetMunicipalitiesListJsonResult;
        this.output();
    },
    /*
    _getFilterList:function(filterType){
        FilterAPIUtils.getFilterListFromServer(filterType);
        this.output();
    },

     _getAllFilterList:function(){
        FilterAPIUtils.getAllDepartamentsFromServer();
        FilterAPIUtils.getAllMunicipalitiesFromServer();
        FilterAPIUtils.getAllDevelopmentObjectiveFromServer();
        this.output();
    },
    */
    _changeFilterItem:function(filterType, id, value){
        debugger;
        this.state[filterType].map(function(item) {
            if (item.id === id) {
                item.selected = value;
            } 
        });
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
