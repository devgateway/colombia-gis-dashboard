'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterStore=require('../../../stores/filterStore.js')
var AllNoneSelector = require('./allNoneSelector.jsx');
var FilterItemList = require('./filterItemList.jsx');
var SelectionCounter = require('./selectionCounter.jsx');

var showOnlySelected = false;
var FilterItem = React.createClass({
    
    _onCounterClicked: function(selected) {     
        this.showOnlySelected = selected;
        this.forceUpdate();
    },

    _filterByParentSelected: function (list, parent, parentParamField) {
        var parentSelected = FilterStore.getAllSelected(parent);
        var selIds = [];
        parentSelected.map(function (item){
            selIds.push(item.id);
        });
        if (this.showOnlySelected || !selIds || selIds.length==0){
            return list;
        } else {
            return list.filter(function (item){
                return (selIds.indexOf(item[parentParamField]) != -1)
                });
        }
    },

    _filterByParent: function (list, parent, parentParamField) {
        return list.filter(function (item){
            return (parent.id == item[parentParamField])
            });
    },

    _hasSelected: function(items) {
        var ret = false;
        items.map(function(it){
            if (it.selected){
                ret = true;
            }
        });
        return ret
    },

    _renderList: function(items, filterDefinition) {
        var parentList = FilterStore.getAllSelected(filterDefinition.parentParam).length==0 || this.showOnlySelected? 
                        FilterStore.getAll(filterDefinition.parentParam) : 
                        FilterStore.getAllSelected(filterDefinition.parentParam);
        var self = this;
        if (filterDefinition.parentParam){//if has parent, then render the list separated by parent an with the parentName at top
            return parentList.map(function (parent){
                        debugger;
                        var list = self._filterByParent(items, parent, filterDefinition.parentParamField);
                        if (!self.showOnlySelected || (self.showOnlySelected && self._hasSelected(list))){
                            return (<FilterItemList 
                                        onItemChanged={self.props.onItemChanged} 
                                        parent={parent} 
                                        items={list} 
                                        filterDefinition={filterDefinition} 
                                        showOnlySelected={self.showOnlySelected}/>);
                        }
                    });
        } else {
            return (<FilterItemList 
                        onItemChanged={self.props.onItemChanged} 
                        items={items} 
                        filterDefinition={filterDefinition} 
                        showOnlySelected={self.showOnlySelected}/>);    
        }
    },

    render: function() {
        var filterDefinition = this.props.filterDefinition; 
        var items = this.props.items;
        items = this._filterByParentSelected(items, filterDefinition.parentParam, filterDefinition.parentParamField); 
        var position = this.props.position; 
        var self = this;
        return(
            <div className="filter-group-sublevel">
                <div className="filter-group-panel-header">
                    <span className="panel-count">{position}</span> 
                    <SelectionCounter selected={FilterStore.getAllSelected(filterDefinition.param).length} total={items.length} onCounterClicked={this._onCounterClicked}/>
                    <span className="filter-label" role="label">{filterDefinition.label}</span>
                    <AllNoneSelector filterType={filterDefinition.param} onAllNoneClicked={self.props.onAllNoneClicked}/>                                                
                </div> 
                <div className="filter-list-container">
                    {this._renderList(items, filterDefinition)}
                </div>
            </div>
        );
    }
});

module.exports = FilterItem;