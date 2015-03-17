'use strict';

var React = require('react');
var FilterItem = require('./filterItem.jsx');
var FilterStore=require('../../stores/filterStore.js')
var FilterMap = require('./filterMap.js');

var FilterItemList = React.createClass({

    _onItemChanged: function(event) {  
        this.props.onItemChanged(this.props.filterDefinition.param, event.target.value, event.target.checked);
    },

    _hasChildSelected: function(parent) {  
        var childrenSelectedList = FilterStore.getAllSelected(this.props.filterDefinition.childParam);
        var listFiltered = childrenSelectedList.filter(function (child){
            return (child['idDepto']==parent.id);
        });
        return listFiltered.length;
    },

    render: function() {
        var items = this.props.items;  
        var filterType = this.props.filterDefinition.param;  
        var self = this;
        return(
            <div className="filter-list-container">
                <ul className="filter-list">
                    {
                        items.map(function(item){ 
                            var childSelCount = self._hasChildSelected(item);
                            if (!item.hide){   
                                return <li key={item.id}>
                                    <FilterItem 
                                        id={item.id} 
                                        name={item.name} 
                                        selected={item.selected} 
                                        filterType={filterType} 
                                        childSelCount={childSelCount}
                                        onItemChanged={self._onItemChanged}/>
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
