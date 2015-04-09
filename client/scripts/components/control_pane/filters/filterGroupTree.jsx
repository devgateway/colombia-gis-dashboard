'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterStore=require('../../../stores/filterStore.js')
var FilterItemList = require('./filterItemList.jsx');
var FilterActions = require('../../../actions/filterActions.js');
var KeywordSearch = require('./keywordSearch.jsx');
var AllNoneSelector = require('./allNoneSelector.jsx');
var SelectionCounter = require('./selectionCounter.jsx');

var showOnlySelected = false;
var FilterGroup = React.createClass({
 
    _onCounterClicked: function(selected) {     
        this.showOnlySelected = selected;
        this.forceUpdate();
    },

    _filterByKeyword: function (keyword) {
        var items;
        if (keyword) {
            // filter the collection
            var pattern = new RegExp(keyword, 'i');
            this.props.filterDefinition.subLevels.map(function(filterDefinition){ 
                FilterStore.getAll(filterDefinition.param).map(function (item) {
                if (!pattern.test(item.name)){
                    item.hide = true;
                }
                });
            });                    
        } else {
            // display the original collection
            this.props.filterDefinition.subLevels.map(function(filterDefinition){ 
                FilterStore.getAll(filterDefinition.param).map(function (item) {
                    item.hide = false;
                });
            });
        }
        this.forceUpdate();
    },

    componentWillMount :function(){ 
        FilterActions.getListFromAPI(this.props.filterDefinition.subLevels[0]);          
        FilterActions.getListFromAPI(this.props.filterDefinition.subLevels[1]);          
    },

    _filterByParent: function (list, parent, parentParamField) {
        return list.filter(function (item){
            return (parent.id == item[parentParamField])
            });
    },

    render: function() {
        var parentFilterDefinition = this.props.filterDefinition.subLevels[0];
        var childFilterDefinition = this.props.filterDefinition.subLevels[1];
        var parentLevelItems = FilterStore.getAll(parentFilterDefinition.param) || [];  
        var childLevelItems = FilterStore.getAll(childFilterDefinition.param) || [];  
        var self = this;
        debugger;
        return(
            <div className="filter-group-panel selected">
                <div className="filter-group-panel-header">
                    <SelectionCounter selected={FilterStore.getAllSelected(childFilterDefinition.param).length} total={childLevelItems.length} onCounterClicked={this._onCounterClicked}/>
                    <span className="filter-label" role="label">{this.props.filterDefinition.label}</span>
                    <AllNoneSelector filterType={parentFilterDefinition.param} onAllNoneClicked={self.props.onAllNoneClicked}/>                                         
                </div>                
                <KeywordSearch onSearch={this._filterByKeyword}/> 
                <div className="filter-list-container">                   
                {    
                    parentLevelItems.map(function (parent){
                        debugger;
                        var list = self._filterByParent(childLevelItems, parent, childFilterDefinition.parentParamField);
                        return (<FilterItemList 
                                    onItemChanged={self.props.onItemChanged} 
                                    parent={parent} 
                                    parentSelectable="true" 
                                    items={list} 
                                    filterDefinition={childFilterDefinition} 
                                    parentFilterDefinition={parentFilterDefinition} 
                                    showOnlySelected={self.showOnlySelected}/>);
                    })
                }
                </div>
            </div>
            );  
        
    }
});

module.exports = FilterGroup;