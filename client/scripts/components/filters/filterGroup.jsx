/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterStore=require('../../stores/filterStore.js')
var FilterItemList = require('./filterItemList.jsx');
var FilterActions = require('../../actions/filterActions.js');
var FilterMap = require('./filterMap.js');


var FilterGroup = React.createClass({
 
    getInitialState: function() {
        return {selectedItems: []};
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
        return items;  
    },

    _searchKeyUp: function(ev) {
        var value = $(ev.target).val();
        var length = value.length;
        debugger;
        // filter the items only if we have at least 3 characters
        if (length > 2 || ev.keyCode == 13) {
            this._filterByKeyword(value);
            this.forceUpdate();
        } else {
            this._filterByKeyword();
            this.forceUpdate();
        }
    },
    
    _filterByParentSelected: function (list, parentSelected, parentParamField) {
        if (!parentSelected || parentSelected.length==0){
            return list;
        } else {
            return list.filter(function (item){
                return (parentSelected.indexOf(item[parentParamField]) != -1)
                });
        }
    },

    componentWillMount :function(){ 
        FilterActions.getListFromAPI(this.props.filterDefinition);          
    },

    _onItemChanged: function(filterType, id, value) {     
        FilterActions.changeFilterItemState(filterType, id, value);
        var selectedItems = this.state.selectedItems;
        if (value){
            selectedItems.push(id);
        } else {
            selectedItems.splice(selectedItems.indexOf(id),1);
        }
        this.setState({selectedItems: selectedItems});            
    },

    render: function() {
        var filterType = this.props.filterDefinition.param;
        var items = FilterStore.getAll(filterType) || [];  
        var self = this;
        var selectCount = "[" + FilterStore.getAllSelected(filterType).length + "/" + items.length + "]";                    
        var child = FilterMap.filters.filter(function (filterDefinition){return (filterDefinition.param === self.props.filterDefinition.childParam)})[0];
        var childFilterGroup;
        if (child){
            childFilterGroup = <FilterGroup filterDefinition={child} parentSelected={this.state.selectedItems}/>
        }
        items = this._filterByParentSelected(items, this.props.parentSelected, this.props.filterDefinition.parentParamField);
        
        /*return(
            <div className="filter-group-panel selected">
                <div className="filter-group-panel-header">
                    <span className="panel-count">1</span>
                    <span className="filter-count">{selectCount}</span>
                    <span className="filter-label" role="label">Level Selections</span>
                    <div className="filter-selectors">
                        <span><a href="#">select all</a></span> / <span><a href="#">diselect all</a></span>
                    </div>
                </div>
                
                <div className="text-search-wrapper">
                    <div className="search-box">
                        <input className="keyword-search" name="keyword-search" type="text" onKeyUp={this._searchKeyUp} />
                    </div>
                </div>

                <FilterItemList items={items} filterType={filterType} onItemChanged={this._onItemChanged}/>
                {childFilterGroup}  
                                          
            </div>
            );*/  
        return(
            <div className="">
                <div className="filter-group-panel-header">
                    <span className="panel-count">1</span>
                    <span className="filter-count">{selectCount}</span>
                    <span className="filter-label" role="label">Level Selections</span>
                    <div className="filter-selectors">
                        <span><a href="#">select all</a></span> / <span><a href="#">diselect all</a></span>
                    </div>
                </div>                                
            </div>
            );
    }
});

module.exports = FilterGroup;