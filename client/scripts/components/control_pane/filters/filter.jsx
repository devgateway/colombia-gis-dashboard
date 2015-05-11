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
    
    componentDidMount: function(){
        $('.item-label').tooltip({container: 'body'});
    },

    render: function() {
      var filters = this.props.type=="basic"? FilterMap.basicFilters : FilterMap.advancedFilters;
      var self = this;
        return(
          <div className="activity-nav">
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
                  return <TabPane eventKey={parseInt(filterDefinition.index)} tab={filterDefinition.label}>
                    {group}
                  </TabPane>                  
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