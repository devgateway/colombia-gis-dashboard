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
        return items;  
    },

    _searchKeyUp: function(ev) {
        var value = $(ev.target).val();
        var length = value.length;
        // filter the items only if we have at least 3 characters
        if (length > 2 || ev.keyCode == 13) {
            this._filterByKeyword(value);
            this.forceUpdate();
        } else {
            this._filterByKeyword();
            this.forceUpdate();
        }
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
                    <span className="panel-count">1</span>
                    <span className="filter-count">{selectCount}</span>
                    <span className="filter-label" role="label">Level Selections</span>
                    <div className="filter-selectors">
                        <span><a href="#">select all</a></span> / <span><a href="#">diselect all</a></span>
                    </div>
                </div>
                
                <KeywordSearch onKeyUp={this._searchKeyUp}/>
                    
                <FilterItemList items={items} filterType={filterType} onItemChanged={this._onItemChanged}/>
                
            </div>
            );  
        
    }
});

module.exports = FilterGroup;