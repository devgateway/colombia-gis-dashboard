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
        this.forceUpdate();
    },
   
    _filterByParentSelected: function (list, parent, parentParamField) {
        var parentSelected = FilterStore.getAllSelected(parent);
        var selIds = [];
        parentSelected.map(function (item){
            selIds.push(item.id);
        });
        if (!selIds || selIds.length==0){
            return list;
        } else {
            return list.filter(function (item){
                return (selIds.indexOf(item[parentParamField]) != -1)
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
                <KeywordSearch onSearch={this._filterByKeyword}/>
                <div className="m-scooch m-center m-scaled m-fade-out">
                    <div className="m-scooch-inner">
                        {
                            this.props.filterDefinition.subLevels.map(function(filterDefinition, index){
                                var items = FilterStore.getAll(filterDefinition.param) || []; 
                                items = self._filterByParentSelected(items, filterDefinition.parentParam, filterDefinition.parentParamField);
                                var selectCount = "[" + FilterStore.getAllSelected(filterDefinition.param).length + "/" + items.length + "]"; 
                                return <div className="m-item">
                                        <div className="filter-group-sublevel">
                                            <div className="filter-group-panel-header">
                                                <span className="panel-count">{index+1}</span>
                                                <span className="filter-count">{selectCount}</span>
                                                <span className="filter-label" role="label">{filterDefinition.label}</span>
                                                <AllNoneSelector filterType={filterDefinition.param}/>                                                
                                            </div>    
                                            <FilterItemList items={items} filterDefinition={filterDefinition} onItemChanged={self._onItemChanged}/>
                                        </div>
                                    </div>;
                            })
                        }  
                    </div>                   
                    <div className="m-scooch-controls m-scooch-pagination">
                        {
                            this.props.filterDefinition.subLevels.map(function(filterDefinition, index){
                                return <a href="#" data-m-slide={index+1}>{filterDefinition.label}</a>
                            })
                        }                          
                    </div>              
                </div>
            </div>  
          );
    }
});

module.exports = FilterGroup;