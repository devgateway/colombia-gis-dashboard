/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var FilterItemList = require('./filterItemList.jsx');
var KeywordSearch = require('./keywordSearch.jsx');
var FilterSubLevel = require('./filterSubLevel.jsx');

var FilterGroup = React.createClass({
    
    getInitialState: function() {
        return {"pageLimit": 'left', "noResults": false};
    },

    _filterByKeyword: function (keyword) {
        var items;
        var self = this;
        if (keyword) {
            // filter the collection
            var pattern = new RegExp(keyword, 'i');
            var noResults = true;
            this.props.filterDefinition.subLevels.map(function(filterDefinition){
                self.props.subLevelsItems[filterDefinition.param].map(function (item) {
                    if (!pattern.test(item.name)){
                        item.hide = true;
                    } else {
                        item.hide = false;
                        noResults = false;
                    }
                });
            });
            self.setState({"noResults": noResults});
        } else {
            // display the original collection
            self.props.filterDefinition.subLevels.map(function(filterDefinition){
                self.props.subLevelsItems[filterDefinition.param].map(function (item) {
                    item.hide = false;
                });
            });
            self.setState({"noResults": false});
        }
        this.forceUpdate();
    },

    componentDidMount: function(){
        $('.m-scooch').scooch();
    },
   
    _movePrev: function(){
        if ($(this.getDOMNode()).find('.m-active').is(':first-child')){
            this.setState({'pageLimit': 'left'});
        }
    },
   
    _moveNext: function(){
        if ($(this.getDOMNode()).find('.m-active').is(':last-child')){
            this.setState({'pageLimit': 'right'});
        }
    },
   
    render: function() {    
        var self = this;
        var prevClass = this.state.pageLimit=='left'? "scooch-prev scooch-disabled" : "scooch-prev";
        var nextClass = this.state.pageLimit=='right'? "scooch-next scooch-disabled" : "scooch-next";
        var noResults = "";
        if (this.state.noResults){
            var noResults = 
                <div className="filter-no-results">
                    <br/>{<Message message="filters.noResults"/>}
                </div>;
        }
        return(
            <div className="filter-group-panel selected">
                <KeywordSearch onSearch={this._filterByKeyword}/>
                {noResults}
                <div className="m-scooch m-center m-scaled m-fade-out">
                    <div className="m-scooch-inner">
                        {
                            this.props.filterDefinition.subLevels.map(function(filterDefinition, index){
                                var items = self.props.subLevelsItems[filterDefinition.param] || [];
                                var parentItems = self.props.subLevelsItems[filterDefinition.parentParam] || [];
                                var childrenItems = self.props.subLevelsItems[filterDefinition.childParam] || [];
                                return  <div className="m-item">
                                            <FilterSubLevel
                                                onAllNoneClicked={self.props.onAllNoneClicked}
                                                onItemChanged={self.props.onItemChanged}
                                                items={items}
                                                parentItems={parentItems}
                                                childrenItems={childrenItems}
                                                filterDefinition={filterDefinition}
                                                position={index+1} />
                                        </div>;
                            })
                        }
                    </div>
                    <div className="m-scooch-controls m-scooch-pagination left">
                        <span className={prevClass} onClick={this._movePrev} data-m-slide="prev">&laquo;</span>
                    </div>

                    <div className="m-scooch-controls m-scooch-pagination right">
                      <span className={nextClass} onClick={this._moveNext} data-m-slide="next">&raquo;</span>
                    </div>

                </div>


            </div>
          );
    }
});

module.exports = FilterGroup;
