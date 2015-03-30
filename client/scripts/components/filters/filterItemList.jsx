'use strict';

var React = require('react');
var FilterItem = require('./filterItem.jsx');
var FilterStore=require('../../stores/filterStore.js')
var FilterMap = require('./filterMap.js');

var FilterItemList = React.createClass({
    
    _hasChildSelected: function(parent) {  
        var childrenSelectedList = FilterStore.getAllSelected(this.props.filterDefinition.childParam);
        var childFilterDefinition = FilterMap.getFilterDefinitionByParam(this.props.filterDefinition.childParam);
        var listFiltered = childrenSelectedList.filter(function (child){
            return (child[childFilterDefinition.parentParamField]==parent.id);
        });
        return listFiltered.length;
    },

    render: function() {
        var showOnlySelected = this.props.showOnlySelected;  
        var items = this.props.items;  
        var filterType = this.props.filterDefinition.param;  
        var self = this;
        var parentName = this.props.parentName;
        return(
            <div>
                {parentName? parentName : ""}
                <ul className="filter-list">
                    {
                        items.map(function(item){ 
                            var childSelCount = self._hasChildSelected(item);
                            if (!item.hide && !(showOnlySelected && (!item.selected))){ 
                                return <li key={item.id}>
                                    <FilterItem
                                        onItemChanged={self.props.onItemChanged} 
                                        id={item.id} 
                                        name={item.name} 
                                        selected={item.selected} 
                                        filterType={filterType} 
                                        childSelCount={childSelCount}/>
                                </li>;
                            }
                        })
                    }
                </ul>
            </div>
            );
    }
});

module.exports = FilterItemList;
