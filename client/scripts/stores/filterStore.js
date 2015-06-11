
'use strict';
var _ = require('lodash');
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
        this.state = {pendingLoad: 0};
        var self = this;
        var filters = FilterMap.getFilterFlatList();
        filters.map(function(item, idx){ 
            self.state[item.param] = [];
        });
        
    },

    onGetAllListsFromAPI: function() {
        var filters = FilterMap.getFilterFlatList();
        var self = this;
        filters.map(function(fd){
            if (fd.apiEndPoint){
                self.onGetListFromAPI(fd);
            } else {
                self.state[fd.param] = fd.dataObjectList;
            }
        });
    },

    onGetListFromAPI: function(filterDefinition) {
        this.state.pendingLoad = this.state.pendingLoad + 1;
        API.getListFromAPI(filterDefinition).then(
          function(data){
            FilterActions.getListFromAPI.completed(data, filterDefinition);
          }).fail(function(){
            console.log('filterStore: Error loading data ...');
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
        this.state.pendingLoad = this.state.pendingLoad - 1;
        this.state[filterDefinition.param] = data;
         if (filterDefinition.parentParamField){
            this.state[filterDefinition.param].map(function (it){
                it.id = it.id+"#"+it[filterDefinition.parentParamField];
            });
        }        
        this.output();
    },
    
    onChangeFilterValue:function(filterType, value){        
        this.state[filterType] = value;
        this.output();
    },

    onChangeFilterItemState:function(filterType, id, value){
        var filterDefinition = FilterMap.getFilterDefinitionByParam(filterType);
        var childFilterDefinition = FilterMap.getFilterDefinitionByParam(filterDefinition.childParam);
        if (childFilterDefinition.param){ //if the item is parent, then select children
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

    onTriggerFilterApply:function(reset, shapesTrigger){
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
        if(!reset){
            if (this.state['sd'] && this.state['sd']!=""){
                filtersSelected.push({param: 'sd', value: this.state['sd']});
            }
            if (this.state['ed'] && this.state['ed']!=""){
                filtersSelected.push({param: 'ed', value: this.state['ed']});
            }
        } else {
            _.assign(this.state,{'resetDates':true});
        }
        this.state.filtersSelected = filtersSelected;
        LayerActions.triggerFilterApply(this.state.filtersSelected, shapesTrigger);
        //alert("Filters Applied: "+ JSON.stringify(this.state.filtersSelected));
        this.output();
    },

    onResetDates: function() {
        this.update({ resetDates: !this.state.resetDates });
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

    update: function(assignable, options) {
        options = options || {};
        this.state = _.assign(this.state, assignable);
        if (!options.silent) {
            this.trigger(this.state);
        }
    },

    getInitialState: function() {
        return (this.state = {
          resetDates: false          
        });
    }

});