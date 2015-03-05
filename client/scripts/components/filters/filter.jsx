/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Reflux = require('reflux');
var FilterMap = require('./filterMap.js');
var FilterStore=require('../../stores/filterStore.js');
var FilterGroup = require('./filterGroup.jsx');
var FilterActionButton = require('./filterActionButton.jsx');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

var Filter  = React.createClass({
    mixins: [Reflux.connect(FilterStore)],

    getDescendents: function(filterKey, descendents){
      if (!descendents) {
        descendents = [];
      }
      var filters = FilterMap.filters;
      var self = this;
      filters.map(function(filterDefinition){
        if (filterDefinition.parentKey == filterKey){
          descendents.push(filterDefinition);
          self.getDescendents(filterDefinition.key, descendents);
        }
      });
      return descendents;
    },

    render: function() {
      var filters = FilterMap.filters;
        return(
          <div>
            <TabbedArea defaultActiveKey={1}>
              {
                filters.map(function(filterDefinition){
                  if (!filterDefinition.isChild){
                    var label = filterDefinition.label + " (" + FilterStore.getAllSelected(filterDefinition.key).length + "/" + FilterStore.getAll(filterDefinition.key).length + ")";
                    return <TabPane eventKey={parseInt(filterDefinition.index)} tab={label}>
                      <FilterGroup filterDefinition={filterDefinition} />
                    </TabPane>
                  }
                })
              }                 
            </TabbedArea>
            <FilterActionButton/>
          </div>
        );
        
    }
});

module.exports = Filter;