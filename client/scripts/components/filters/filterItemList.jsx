'use strict';

var React = require('react');
var FilterItem = require('./filterItem.jsx');
var FilterStore=require('../../stores/filterStore.js')
var FilterMap = require('./filterMap.js');

var FilterItemList = React.createClass({
    
    getInitialState: function() {
        return {collapsed: false};
    },

    _getChildrenSelection: function(parent) {  
        if (this.props.filterDefinition.childParam){           
            var childFilterDefinition = FilterMap.getFilterDefinitionByParam(this.props.filterDefinition.childParam);
            return FilterStore.getChildrenSelected(parent, childFilterDefinition).length+"/"+FilterStore.getChildren(parent, childFilterDefinition).length;
        } else {
            return null;
        }
    },

    _expandCollapse: function() {
        if (!this.state.collapsed){
            this.setState({collapsed: true});
        } else {
            this.setState({collapsed: false});
        }
    },

    render: function() {
        var showOnlySelected = this.props.showOnlySelected;  
        var items = this.props.items;  
        var filterDefinition = this.props.filterDefinition;  
        var self = this;
        var parent = "";
        var listClass = "filter-list";
        if (this.props.parentSelectable){
            listClass += " tabbed";
            var _parent = this.props.parent;
            var collapseIcon = this.state.collapsed? "collapse-icon glyphicon glyphicon-plus" : "collapse-icon glyphicon glyphicon-minus";
            var childSelectedCount = FilterStore.getChildrenSelected(_parent, filterDefinition).length+"/"+FilterStore.getChildren(_parent, filterDefinition).length;
            if ((!_parent.hide && !(showOnlySelected && (!_parent.selected))) || FilterStore.getChildrenSelected(_parent, filterDefinition).length>0){
                parent = <div className="inline">
                            <FilterItem
                            onItemChanged={self.props.onItemChanged} 
                            id={this.props.parent.id} 
                            name={this.props.parent.name} 
                            selected={this.props.parent.selected} 
                            filterType={filterDefinition.parentParam} 
                            childSelectedCount={childSelectedCount}/>
                            <span className={collapseIcon} onClick={self._expandCollapse}></span>
                        </div>
                        ; 
            }
        } else if (this.props.parent) {
            listClass  += " tabbed";
            parent = this.props.parent.name
        }
        if (this.state.collapsed){
            listClass  += " hide";
        }
        return(
            <div>
                {parent}
                <ul className={listClass}>
                    {
                        items.map(function(item){ 
                            var childSelectedCount = self._getChildrenSelection(item);
                            if (!item.hide && !(showOnlySelected && (!item.selected))){ 
                                return <li key={item.id}>
                                    <FilterItem
                                        onItemChanged={self.props.onItemChanged} 
                                        id={item.id} 
                                        name={item.name} 
                                        selected={item.selected} 
                                        filterType={filterDefinition.param} 
                                        childSelectedCount={childSelectedCount}/>
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
