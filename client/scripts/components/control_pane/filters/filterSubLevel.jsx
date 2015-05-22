'use strict';

/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var AllNoneSelector = require('./allNoneSelector.jsx');
var FilterItemList = require('./filterItemList.jsx');
var SelectionCounter = require('./selectionCounter.jsx');

var showOnlySelected = false;
var FilterItem = React.createClass({
    
    _onCounterClicked: function(selected) {     
        this.showOnlySelected = selected;
        this.forceUpdate();
    },

    _filterByParent: function (list, parent, parentParamField) {
        return list.filter(function (item){
            return (parent.id == item[parentParamField])
            });
    },

    _hasSelected: function(items) {
        var ret = false;
        items.map(function(it){
            if (it.selected){
                ret = true;
            }
        });
        return ret
    },

    _renderList: function(items, filterDefinition) {
        var parentSelected = this.props.parentItems.filter(function (data) {return (data.selected);});
        var parentList = this.props.parentItems;
        var self = this;
        if (filterDefinition.parentParam){//if has parent, then render the list separated by parent an with the parentName at top
            return parentList.map(function (parent){
                        var list = self._filterByParent(items, parent, filterDefinition.parentParamField);
                        var hide = !(!self.showOnlySelected || (self.showOnlySelected && self._hasSelected(list)));
                        return (<FilterItemList 
                                    onItemChanged={self.props.onItemChanged} 
                                    parent={parent} 
                                    items={list} 
                                    hide={hide}
                                    childrenItems={self.props.childrenItems}
                                    filterDefinition={filterDefinition} 
                                    showOnlySelected={self.showOnlySelected}/>);
                    });
        } else {
            return (<FilterItemList 
                        onItemChanged={self.props.onItemChanged} 
                        items={items} 
                        filterDefinition={filterDefinition} 
                        childrenItems={self.props.childrenItems}
                        showOnlySelected={self.showOnlySelected}/>);    
        }
    },

    componentDidMount: function(){
        $(this.getDOMNode()).find('.filter-list-container-carousel').mCustomScrollbar({theme:"inset-dark"});
    },

    render: function() {
        var filterDefinition = this.props.filterDefinition; 
        var items = this.props.items;
        var itemsSelected = this.props.items.filter(function (data) {return (data.selected);});
        var position = this.props.position; 
        var self = this;
        return(
            <div className="filter-group-sublevel">
                <div className="filter-group-panel-header">
                    <span className="panel-count">{position}</span> 
                    <span className="filter-label" role="label">{filterDefinition.label}</span>
                    <SelectionCounter selected={itemsSelected.length} total={items.length} onCounterClicked={this._onCounterClicked}/>
                    <AllNoneSelector filterType={filterDefinition.param} onAllNoneClicked={self.props.onAllNoneClicked}/>                                                
                </div> 
                <div className="filter-list-container-carousel">
                    {this._renderList(items, filterDefinition)}
                </div>
            </div>
        );
    }
});

module.exports = FilterItem;