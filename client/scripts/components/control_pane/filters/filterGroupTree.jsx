'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterStore=require('../../../stores/filterStore.js')
var FilterMap=require('../../../conf/filterMap.js')
var FilterItemList = require('./filterItemList.jsx');
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
                        if (filterDefinition.parentParam){
                            if (FilterStore.getAll(filterDefinition.parentParam).filter(
                                function(i){return i.id==item[filterDefinition.parentParamField]})[0].hide){
                                    item.hide= true;
                                }
                        } else {
                            item.hide = true;
                        }
                    } else {
                        if (filterDefinition.parentParam){
                            FilterStore.getAll(filterDefinition.parentParam).filter(
                                function(i){return i.id==item[filterDefinition.parentParamField]}
                            )[0].hide = false;
                        }
                        if (filterDefinition.childParam){
                            FilterStore.getChildren(item, FilterMap.getFilterDefinitionByParam(filterDefinition.childParam))
                                .map(function(i){i.hide = false;});
                        }
                        item.hide = false;
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

    _filterByParent: function (list, parent, parentParamField) {
        return list.filter(function (item){
            return (parent.id == item[parentParamField])
            });
    },

    componentDidMount: function(){
        //$(this.getDOMNode()).find('.filter-list-container').mCustomScrollbar({theme:"inset-dark"});
    },

    render: function() {
        //console.log("filters->filter-group-tree: render - " + this.props.filterDefinition.label);
        var parentFilterDefinition = this.props.filterDefinition.subLevels[0];
        var childFilterDefinition = this.props.filterDefinition.subLevels[1];
        var parentLevelItems = FilterStore.getAll(parentFilterDefinition.param) || [];  
        var childLevelItems = FilterStore.getAll(childFilterDefinition.param) || [];  
        var self = this;
        return(
            <div className="filter-group-panel selected">
                <div className="filter-group-panel-header">
                    <span className="filter-label" role="label">{this.props.filterDefinition.label}</span>
                    <SelectionCounter selected={FilterStore.getAllSelected(childFilterDefinition.param).length} total={childLevelItems.length} onCounterClicked={this._onCounterClicked}/>
                    <AllNoneSelector filterType={parentFilterDefinition.param} onAllNoneClicked={self.props.onAllNoneClicked}/>                                         
                </div>                
                <KeywordSearch onSearch={this._filterByKeyword}/> 
                <div className="filter-list-container">                   
                {    
                    parentLevelItems.map(function (parent){
                        var list = self._filterByParent(childLevelItems, parent, childFilterDefinition.parentParamField);
                        return (<FilterItemList 
                                    onItemChanged={self.props.onItemChanged} 
                                    parent={parent} 
                                    parentSelectable="true" 
                                    collapsed="true"
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