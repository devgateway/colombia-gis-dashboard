'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterStore=require('../../stores/filterStore.js')
var FilterItemList = require('./filterItemList.jsx');
var FilterActions = require('../../actions/filterActions.js');
var FilterMap = require('./filterMap.js');
var KeywordSearch = require('./keywordSearch.jsx');
var AllNoneSelector = require('./allNoneSelector.jsx');

var FilterGroup = React.createClass({
 
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

    _onItemChanged: function(filterType, id, value) {    
        FilterActions.changeFilterItemState(filterType, id, value);     
    },

    render: function() {
        var filterType = this.props.filterDefinition.param;
        var items = FilterStore.getAll(filterType) || [];  
        var self = this;
        var selectCount = "[" + FilterStore.getAllSelected(filterType).length + "/" + items.length + "]";                    
        
        return(
            <div className="filter-group-panel selected">
                <div className="filter-group-panel-header">
                    <span className="filter-count">{selectCount}</span>
                    <span className="filter-label" role="label">Level Selections</span>
                    <AllNoneSelector filterType={filterType}/>                                                
                </div>
                
                <KeywordSearch onSearch={this._filterByKeyword}/>
                    
                <FilterItemList items={items} filterDefinition={this.props.filterDefinition} onItemChanged={this._onItemChanged}/>
                
            </div>
            );  
        
    }
});

module.exports = FilterGroup;