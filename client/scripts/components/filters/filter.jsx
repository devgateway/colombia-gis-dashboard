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

    render: function() {
      var filters = FilterMap.filters;
        return(
          <div>
            <TabbedArea defaultActiveKey={1}>
              {
                filters.map(function(item){
                  var label = item.label + " (" + FilterStore.getAllSelected(item.key).length + "/" + FilterStore.getAll(item.key).length + ")";
                  return <TabPane eventKey={parseInt(item.index)} tab={label}>
                    <FilterGroup filterDefinition={item}/>
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