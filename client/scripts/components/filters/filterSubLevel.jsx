'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterStore=require('../../stores/filterStore.js')
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

    render: function() {
        var filterDefinition = this.props.filterDefinition; 
        var items = this.props.items;
        items = this._filterByParentSelected(items, filterDefinition.parentParam, filterDefinition.parentParamField); 
        var position = this.props.position; 
        return(
            <div className="filter-group-sublevel">
                <div className="filter-group-panel-header">
                    <span className="panel-count">{position}</span> 
                    <SelectionCounter selected={FilterStore.getAllSelected(filterDefinition.param).length} total={items.length} onCounterClicked={this._onCounterClicked}/>
                    <span className="filter-label" role="label">{filterDefinition.label}</span>
                    <AllNoneSelector filterType={filterDefinition.param}/>                                                
                </div>    
                <FilterItemList items={items} filterDefinition={filterDefinition} showOnlySelected={this.showOnlySelected}/>
            </div>
        );
    }
});

module.exports = FilterItem;