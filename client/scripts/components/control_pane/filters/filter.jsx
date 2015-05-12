/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var FilterMap = require('../../../conf/filterMap.js');

var FilterDate = require('./dateFilter.jsx');
var FilterGroup = require('./filterGroup.jsx');
var FilterGroupTree = require('./filterGroupTree.jsx');
var FilterGroupWithSubLevels = require('./filterGroupWithSubLevels.jsx');
var FilterActionButton = require('./filterActionButton.jsx');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

var FilterActions = require('../../../actions/filterActions.js');
var FilterStore=require('../../../stores/filterStore.js');


var Filter  = React.createClass({
    mixins: [Reflux.connect(FilterStore)],

    _onItemChanged: function(filterType, id, value) {     
        FilterActions.changeFilterItemState(filterType, id, value);
    },

    _onValueChanged: function(filterType,value) {     
        FilterActions.changeFilterValue(filterType, value);
    },

    _onClickApply: function(event) {     
        FilterActions.triggerFilterApply();
    },

    _onClickReset: function(event) {     
        FilterActions.triggerFilterReset();
    },
    
    _onAllNoneClicked: function(filterType, selected) {
        FilterActions.changeAllFilterItemState(filterType, selected);  
    },    
    
    _showAdvancedMode: function() {
        this.setState({advancedMode: "true"}); 
    },    
    
    _showBasicMode: function() {
        this.setState({advancedMode: "false"}); 
    },    
    
    componentDidMount: function(){
        $('.item-label').tooltip({container: 'body'});
    },

    getInitialState: function() {
      this.state = this.state || {};
      return this.state;
    },

    render: function() {
      var filters = FilterMap.filters;
      var idx = 1;
      var self = this;
        return(
          <div className="activity-nav">
            <div className="filter-type-wrapper">
              <ul className="filter-type-label nav nav-tabs">
                <li className={self.state.advancedMode=="true"? "" : "active"}>
                  <a href="#" onClick={this._showBasicMode}>Basic Filters</a>
                </li>
                <li className={self.state.advancedMode=="true"? "active" : ""}>
                  <a href="#" onClick={this._showAdvancedMode}>Advanced Filters</a>
                </li>
              </ul>
            </div>
            <TabbedArea className="activities" defaultActiveKey={1}>
              {
                filters.map(function(filterDefinition){
                  if (!filterDefinition.subLevels){
                    var group = <FilterGroup filterDefinition={filterDefinition} onItemChanged={self._onItemChanged} onAllNoneClicked={self._onAllNoneClicked}/>
                  } else {
                    if (filterDefinition.showTree){
                      var group = <FilterGroupTree filterDefinition={filterDefinition} onItemChanged={self._onItemChanged} onAllNoneClicked={self._onAllNoneClicked}/>
                    } else {
                      var group = <FilterGroupWithSubLevels filterDefinition={filterDefinition} onItemChanged={self._onItemChanged} onAllNoneClicked={self._onAllNoneClicked}/>
                    }                    
                  }
                  if (!filterDefinition.advanced || (filterDefinition.advanced && self.state.advancedMode=="true")){
                    return <TabPane eventKey={idx++} tab={filterDefinition.label}>
                      {group}
                    </TabPane> 
                  }                 
                })
              } 
              <TabPane tab="Date">
                  <FilterDate onValueChanged={self._onValueChanged}/>
              </TabPane>               
            </TabbedArea>
            <FilterActionButton onClickReset={this._onClickReset} onClickApply={this._onClickApply}/>
          </div>
        );
        
    }
});

module.exports = Filter;