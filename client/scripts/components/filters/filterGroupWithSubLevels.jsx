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

    getInitialState: function() {
        return {selectedItems: []};
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

    _filterByParentSelected: function (list, parent, parentParamField) {
        var parentSelected = FilterStore.getAllSelected(parent);
        if (!parentSelected || parentSelected.length==0){
            return list;
        } else {
            return list.filter(function (item){
                return (parentSelected.indexOf(item[parentParamField]) != -1)
                });
        }
    },

    componentWillMount :function(){
        this.props.filterDefinition.subLevels.map(function(filterDefinition){
            FilterActions.getListFromAPI(filterDefinition);
        });
    },

    _onItemChanged: function(filterType, id, value) {
        FilterActions.changeFilterItemState(filterType, id, value);
    },

    render: function() {
        if ($('.m-scooch').length>0){
          $('.m-scooch').scooch();
        }
        var self = this;
        return(
            <div className="filter-group-panel selected">
                <KeywordSearch onKeyUp={this._searchKeyUp}/>
                <div className="m-scooch m-center m-scaled m-fade-out">
                    <div className="m-scooch-inner">
                        {
                            this.props.filterDefinition.subLevels.map(function(filterDefinition){
                                var items = FilterStore.getAll(filterDefinition.param) || [];
                                items = self._filterByParentSelected(items, filterDefinition.parentParam, filterDefinition.parentParamField);
                                var selectCount = "[" + FilterStore.getAllSelected(filterDefinition.param).length + "/" + items.length + "]";
                                return <div className="m-item">
                                        <div className="filter-group-sublevel">
                                            <div className="filter-group-panel-header">
                                                <span className="filter-count">{selectCount}</span>
                                                <span className="filter-label" role="label">{filterDefinition.label}</span>
                                                <div className="filter-selectors">
                                                    <span><a href="#">select all</a></span> / <span><a href="#">diselect all</a></span>
                                                </div>
                                            </div>
                                            <FilterItemList items={items} filterType={filterDefinition.param} onItemChanged={self._onItemChanged}/>
                                        </div>
                                    </div>;
                            })
                        }
                    </div>
                </div>
                  <div className="m-scooch-controls ">
                        <a href="#" data-m-slide="prev">Previous</a>
                        <a href="#" data-m-slide="next"> Next </a>
                  </div>
            </div>
          );
    }
});

module.exports = FilterGroup;
