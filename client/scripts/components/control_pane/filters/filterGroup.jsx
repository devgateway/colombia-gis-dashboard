'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterStore=require('../../../stores/filterStore.js')
var FilterActions = require('../../../actions/filterActions.js');

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
            FilterStore.getAll(this.props.filterDefinition.param).map(function (item) {
                if (!pattern.test(item.name)){
                    item.hide = true;
                }
            });
        } else {
            // display the original collection
            FilterStore.getAll(this.props.filterDefinition.param).map(function (item) {
                item.hide = false;
            });
        }
        this.forceUpdate();
    },

    componentWillMount :function(){ 
        FilterActions.getListFromAPI(this.props.filterDefinition);          
    },

    render: function() {
        var filterDefinition = this.props.filterDefinition;
        var items = FilterStore.getAll(filterDefinition.param) || [];  
        var self = this;
        return(
            <div className="filter-group-panel selected">
                <div className="filter-group-panel-header">
                    <SelectionCounter selected={FilterStore.getAllSelected(filterDefinition.param).length} total={items.length} onCounterClicked={this._onCounterClicked}/>
                    <span className="filter-label" role="label">{this.props.filterDefinition.label}</span>
                    <AllNoneSelector filterType={filterDefinition.param} onAllNoneClicked={self.props.onAllNoneClicked}/>                                                
                </div>                
                <KeywordSearch onSearch={this._filterByKeyword}/> 
                <div className="filter-list-container">                   
                    <FilterItemList 
                        onItemChanged={this.props.onItemChanged}
                        items={items} 
                        filterDefinition={this.props.filterDefinition} 
                        showOnlySelected={this.showOnlySelected}/>                
                </div>
            </div>
            );  
        
    }
});

module.exports = FilterGroup;