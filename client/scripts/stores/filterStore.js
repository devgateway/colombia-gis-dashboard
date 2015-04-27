
'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var FilterActions = require('../actions/filterActions.js');
var LayerActions = require('../actions/layersAction.js');
var FilterMap = require('../conf/filterMap.js');
var API = require('../api/filters.js');

module.exports=Reflux.createStore({

    listenables: FilterActions,
    // Initial setup
    init: function() {
        this.state = {};
        var self = this;
        var filters = FilterMap.filters;
        filters.map(function(item, idx){ 
            self.state[item.param] = [];
        });
        
    },

    onGetAllListsFromAPI: function() {
        var filters = FilterMap.getFilterFlatList();
        var self = this;
        filters.map(function(fd){
            self.onGetListFromAPI(fd);
        });
    },

    onGetListFromAPI: function(filterDefinition) {
        API.getListFromAPI(filterDefinition).then(
          function(data){
            FilterActions.getListFromAPI.completed(data, filterDefinition);
          }).fail(function(){
            console.log('layersStore: Error loading data ...');
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

    getChildren: function(parent, childFilterDefinition) {
        if (this.state[childFilterDefinition.param]) {
          return this.state[childFilterDefinition.param].filter(function(it){return it[childFilterDefinition.parentParamField]==parent.id});
        } else {
          return [];
        }
    },

    getChildrenSelected: function(parent, childFilterDefinition) {
        if (this.state[childFilterDefinition.param]) { 
            return this.state[childFilterDefinition.param].filter(function(it){
                    return it[childFilterDefinition.parentParamField]==parent.id && it.selected;
                });
        } else {
          return [];
        }
    },

    onGetListFromAPICompleted: function(data, filterDefinition){
        this.state[filterDefinition.param] = data;
         if (filterDefinition.parentParamField){
            this.state[filterDefinition.param].map(function (it){
                it.id = it.id+"#"+it[filterDefinition.parentParamField];
            });
        }        
        this.output();
    },
    
    onChangeFilterItemState:function(filterType, id, value){
        var filterDefinition = FilterMap.getFilterDefinitionByParam(filterType);
        var childFilterDefinition = FilterMap.getFilterDefinitionByParam(filterDefinition.childParam);
        if (childFilterDefinition){ //if the item is parent, then select children
            this.state[childFilterDefinition.param].map(function (it){
                if (it[childFilterDefinition.parentParamField]==id){
                    it.selected = value;
                }
            });
        }
        this.state[filterType].filter(function(it){return it.id==id})[0].selected = value;
        this.output();
    },

    onChangeAllFilterItemState:function(filterType, value){
        var filterDefinition = FilterMap.getFilterDefinitionByParam(filterType);
        var self = this;
        this.state[filterType].map(function(it){
            it.selected = value;            
        });
        if (filterDefinition.childParam){
            this.state[filterDefinition.childParam].map(function(it){
                it.selected = value;            
            });
        }
        this.output();
    },

    onTriggerFilterApply:function(reset){
        var self = this;
        var filters = FilterMap.getFilterFlatList();
        var filtersSelected = [];
        filters.map(function(filter){
            var selectedIds = []; 
            var itemList = self.state[filter.param];
            itemList.map(function(item){ 
                if (reset){
                    item.selected = false;
                } else {
                    if (item.selected){
                        if (filter.parentParamField){
                            selectedIds.push(item.id.split("#")[0]);
                        } else {
                            selectedIds.push(item.id);
                        }                        
                    }
                }
            });
            if (selectedIds.length>0){
                filtersSelected.push({param: filter.param, values: selectedIds});
            }  
        });

        this.state.filtersSelected = filtersSelected;
        LayerActions.triggerFilterApply(this.state.filtersSelected);
        //alert("Filters Applied: "+ JSON.stringify(this.state.filtersSelected));
        this.output();
    },

    onTriggerFilterReset:function(){        
        this.onTriggerFilterApply(true);
    },

    
    onLoadFilterSaved:function(filters){ 
        //TODO: connect to map store, load filters from saved map and pass it as param for this function   
        filters = [{param:'tp', values:[31,26,28,27]}, {param:'cr', values:[1,2,3,4]}, {param:'do', values:['DO2','DO3','DO4']}, ];
        var self = this;
        filters.map(function(filterGroup){
            var group = self.state[filterGroup.param];           
            filterGroup.values.map(function(id){
                group.filter(function(item){return item.id==id})[0].selected = true;
            });
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