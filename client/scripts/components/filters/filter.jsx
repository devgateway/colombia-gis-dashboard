/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var FilterMap = require('./filterMap.js');
var FilterStore=require('../../stores/filterStore.js');
var FilterGroup = require('./filterGroup.jsx');
var FilterGroupWithSubLevels = require('./filterGroupWithSubLevels.jsx');
var FilterActionButton = require('./filterActionButton.jsx');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var FilterActions = require('../../actions/filterActions.js');


var Filter  = React.createClass({
    mixins: [Reflux.connect(FilterStore)],

    _onItemChanged: function(filterType, id, value) {     
        FilterActions.changeFilterItemState(filterType, id, value);
    },

    _onClickApply: function(event) {     
        FilterActions.triggerFilterApply();
    },

    _onClickReset: function(event) {     
        FilterActions.triggerFilterReset();
    },

    render: function() {
      var filters = FilterMap.filters;
      var self = this;
        return(
          <div className="activity-nav">
            <TabbedArea className="activities" defaultActiveKey={1}>
              {
                filters.map(function(filterDefinition){
                  if (!filterDefinition.subLevels){
                    var group = <FilterGroup filterDefinition={filterDefinition} onItemChanged={self._onItemChanged}/>
                  } else {
                    var group = <FilterGroupWithSubLevels filterDefinition={filterDefinition} onItemChanged={self._onItemChanged}/>
                  }
                  return <TabPane eventKey={parseInt(filterDefinition.index)} tab={filterDefinition.label}>
                    {group}
                  </TabPane>                  
                })
              }                 
            </TabbedArea>
            <FilterActionButton onClickReset={this._onClickReset} onClickApply={this._onClickApply}/>
          </div>
        );
        
    }
});

module.exports = Filter;