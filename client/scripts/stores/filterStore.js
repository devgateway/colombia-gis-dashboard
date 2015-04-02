
'use strict';

var assign = require('object-assign');
var Reflux = require('reflux');
var FilterActions = require('../actions/filterActions.js');
var LayerActions = require('../actions/layersAction.js');
var FilterMap = require('../components/filters/filterMap.js');

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

    onGetListFromAPICompleted: function(data){
        var filterType = data.filter.param;
        this.state[filterType] = data.data;        
        this.output();
    },
    
    onChangeFilterItemState:function(filterType, id, value){
        var filterDefinition = FilterMap.getFilterDefinitionByParam(filterType);
        var childFilterDefinition = FilterMap.getFilterDefinitionByParam(filterDefinition.childParam);
        if (childFilterDefinition){ //if the item is parent, then select children
            this.state[childFilterDefinition.param].filter(function(it){return it[childFilterDefinition.parentParamField]==id}).map(function (it){
                it.selected = value;
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
            /*if (filterDefinition.parentParam){//if has a parent selected, then select only all children for that selection
                if (self.getAllSelected(filterDefinition.parentParam).length==0 ||
                    (self.getItem(filterDefinition.parentParam, it[filterDefinition.parentParamField])[0].selected == true)){
                        it.selected = value;
                }
            } else {
                it.selected = value;
            }*/
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
        var filters = FilterMap.filters;
        var filtersSelected = [];
        filters.map(function(filterDefinition){ 
            var selectedIds = [];
            if (filterDefinition.subLevels){ //iterate over sublevels of filter definition
                filterDefinition.subLevels.map(function(fd){ 
                    var selIds = [];
                    var itemList = self.state[fd.param];
                    itemList.map(function(item){ 
                        if (reset){
                            item.selected = false;
                        } else {
                            if (item.selected){
                                selIds.push(item.id);
                            }
                        }
                    });
                    if (selIds.length>0){
                        filtersSelected.push({param: fd.param, values: selIds});
                    }    
                });
            } else {
                var itemList = self.state[filterDefinition.param];
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
                    filtersSelected.push({param: filterDefinition.param, values: selectedIds});
                }
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