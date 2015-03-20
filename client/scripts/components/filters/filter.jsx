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

var Filter  = React.createClass({
    mixins: [Reflux.connect(FilterStore)],

    render: function() {
      var filters = FilterMap.filters;
        return(
          <div className="activity-nav">
            <TabbedArea className="activities" defaultActiveKey={1}>
              {
                filters.map(function(filterDefinition){
                  if (!filterDefinition.subLevels){
                    var group = <FilterGroup filterDefinition={filterDefinition} />
                  } else {
                    var group = <FilterGroupWithSubLevels filterDefinition={filterDefinition} />
                  }
                  return <TabPane eventKey={parseInt(filterDefinition.index)} tab={filterDefinition.label}>
                    {group}
                  </TabPane>                  
                })
              }                 
            </TabbedArea>
            <FilterActionButton/>
          </div>
        );
        
    }
});

module.exports = Filter;