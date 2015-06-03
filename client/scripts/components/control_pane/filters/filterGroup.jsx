var React = require('react');
var Reflux = require('reflux');
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
        debugger;
        if (keyword) {
            // filter the collection
            var self = this;
            var pattern = new RegExp(keyword, 'i');
            var flag = true;
            this.props.allItems.map(function (item) {
                if (!pattern.test(item.name)){
                    item.hide = true;
                } else {
                    item.hide = false;
                    flag = false;
                    $(self.getDOMNode()).find('.filter-no-results').get(0).style.display="none";
                }
            });
            if(flag){
                $(this.getDOMNode()).find('.filter-no-results').get(0).style.display="";
            }
        } else {
            // display the original collection
            this.props.allItems.map(function (item) {
                item.hide = false;
            });
            $(this.getDOMNode()).find('.filter-no-results').get(0).style.display="none";
        }
        this.forceUpdate();
    },

    componentDidMount: function(){
        $(this.getDOMNode()).find('.filter-list-container').mCustomScrollbar({theme:"inset-dark"});
        if($(this.getDOMNode()).find('.filter-no-results')){
            $(this.getDOMNode()).find('.filter-no-results').get(0).style.display="none";
        }
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
                <div className="filter-no-results"> 
                    <br/>{<Message message="filters.noResults"/>}
                </div>
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