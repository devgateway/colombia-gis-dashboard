/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterStore=require('../../../stores/filterStore.js')

var FilterItemList = require('./filterItemList.jsx');

var KeywordSearch = require('./keywordSearch.jsx');
var FilterSubLevel = require('./filterSubLevel.jsx');

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
   
    componentDidMount: function(){
        $('.m-scooch').scooch();      
    },

    render: function() {
        var self = this;
        return(
            <div className="filter-group-panel selected">
                <KeywordSearch onSearch={this._filterByKeyword}/>
                <div className="m-scooch m-center m-scaled m-fade-out">
                    <div className="m-scooch-inner">
                        {
                            this.props.filterDefinition.subLevels.map(function(filterDefinition, index){
                                var items = FilterStore.getAll(filterDefinition.param) || []; 
                                return  <div className="m-item">
                                            <FilterSubLevel 
                                                onAllNoneClicked={self.props.onAllNoneClicked}
                                                onItemChanged={self.props.onItemChanged}
                                                items={items} 
                                                filterDefinition={filterDefinition} 
                                                position={index+1} />                                        
                                        </div>;
                            })
                        }  
                    </div>                   
                    <div className="m-scooch-controls m-scooch-pagination">
                        <a href="#" data-m-slide="prev">Previous</a>
                        <a href="#" data-m-slide="next">Next</a>
                                               
                    </div>              
                </div>
            </div>  
          );
    }
});

module.exports = FilterGroup;