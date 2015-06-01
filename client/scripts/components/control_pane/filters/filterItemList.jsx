'use strict';

var React = require('react');
var FilterItem = require('./filterItem.jsx');
var FilterMap = require('../../../conf/filterMap.js');

var FilterItemList = React.createClass({
    
    getInitialState: function() {
        return {collapsed: this.props.collapsed? true : false};
    },

    _getChildrenSelectionLabel: function(parent) {
        if (this.props.filterDefinition.childParam){
            var childFilterDefinition = FilterMap.getFilterDefinitionByParam(this.props.filterDefinition.childParam);
            return this._getChildrenSelected(parent, childFilterDefinition).length+"/"+this._getChildren(parent, childFilterDefinition).length;
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

    _getChildren: function(parent, childFilterDefinition) {
        return this.props.childrenItems.filter(function(it){return it[childFilterDefinition.parentParamField]==parent.id});
    },
    
    _getChildrenSelected: function(parent, childFilterDefinition) {
        return this.props.childrenItems.filter(function(it){return it[childFilterDefinition.parentParamField]==parent.id  && it.selected});
    },
    
    componentDidMount: function(){
        $('.item-label').tooltip({container: 'body'});
    },
    
    render: function() {
        var showOnlySelected = this.props.showOnlySelected;
        var items = this.props.items;
        var filterDefinition = this.props.filterDefinition;
        var self = this;
        var parent = "";
        var listClass = "filter-list";
        if (filterDefinition.labelFunction){
            var labelFunction = new Function('return ' + filterDefinition.labelFunction)();
        } 
        if (this.props.parentSelectable){
            listClass += " tabbed";
            var _parent = this.props.parent;
            var itemsSelected = this.props.items.filter(function (data) {return (data.selected);});
            var childSelectedCount = itemsSelected.length + "/" + this.props.items.length;
            if ((!_parent.hide && !(showOnlySelected && (!_parent.selected))) || (!_parent.hide && itemsSelected.length>0)){
                parent = <div className="filter-parent">
                            <FilterItem
                            onItemChanged={self.props.onItemChanged}
                            id={this.props.parent.id}
                            name={labelFunction? labelFunction(this.props.parent.name) : this.props.parent.name}
                            selected={this.props.parent.selected || false}
                            filterType={filterDefinition.parentParam}
                            childSelectedCount={childSelectedCount}
                            onExpandCollapse={self._expandCollapse}
                            collapsed={this.state.collapsed}/>
                        </div>
                        ;
            }
        } else if (this.props.parent) {
            listClass  += " tabbed";
            parent = <div className="filter-col-parent">{this.props.parent.name}</div>
        }
        if (this.state.collapsed){
            listClass  += " hide";
        }
        if (this.props.hide==true){
            return null;
        }
        return(
            <div>
                {parent}
                <ul className={listClass}>
                    {
                        items.map(function(item){
                            var childSelectedCount = self._getChildrenSelectionLabel(item);
                            if (!item.hide && !(showOnlySelected && (!item.selected))){
                                return <li key={item.id}>
                                    <FilterItem
                                        onItemChanged={self.props.onItemChanged}
                                        id={item.id}
                                        name={labelFunction? labelFunction(item.name) : item.name}
                                        selected={item.selected || false}
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
