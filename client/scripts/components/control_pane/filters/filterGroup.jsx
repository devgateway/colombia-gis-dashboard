/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterItemList = require('./filterItemList.jsx');
var KeywordSearch = require('./keywordSearch.jsx');
var AllNoneSelector = require('./allNoneSelector.jsx');
var SelectionCounter = require('./selectionCounter.jsx');

var showOnlySelected = false;
var FilterGroup = React.createClass({
 
    _onCounterClicked: function(selected) {     
        this.showOnlySelected = selected;
        this.forceUpdate();
    },

    _filterByKeyword: function (keyword) {
        var items;
        if (keyword) {
            // filter the collection
            var pattern = new RegExp(keyword, 'i');
            this.props.allItems.map(function (item) {
                if (!pattern.test(item.name)){
                    item.hide = true;
                }
            });
        } else {
            // display the original collection
            this.props.allItems.map(function (item) {
                item.hide = false;
            });
        }
        this.forceUpdate();
    },

    componentDidMount: function(){
        $(this.getDOMNode()).find('.filter-list-container').mCustomScrollbar({theme:"inset-dark"});
    },

    render: function() {
        //console.log("filters->filter-group: render - " + this.props.filterDefinition.label);
        var filterDefinition = this.props.filterDefinition;
        var items = this.props.allItems || [];  
        var itemsSelected = this.props.allItems.filter(function (data) {return (data.selected);});
        var self = this;
        return(
            <div className="filter-group-panel selected">
                <div className="filter-group-panel-header">
                    <span className="filter-label" role="label">{<Message message={this.props.filterDefinition.label}/>}</span>
                    <SelectionCounter selected={itemsSelected.length} total={items.length} onCounterClicked={this._onCounterClicked}/>
                    <AllNoneSelector filterType={filterDefinition.param} onAllNoneClicked={self.props.onAllNoneClicked}/>                                                
                </div>                
                <KeywordSearch onSearch={this._filterByKeyword}/> 
                <div className="filter-list-container">                   
                    <FilterItemList 
                        onItemChanged={this.props.onItemChanged}
                        items={items} 
                        filterDefinition={this.props.filterDefinition} 
                        showOnlySelected={this.showOnlySelected}/>                
                </div>
            </div>
            );  
        
    }
});

module.exports = FilterGroup;