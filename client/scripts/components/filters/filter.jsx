/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var FilterActions = require('../../actions/filterActions.js');
var FilterMap = require('./filterMap.js');
var FilterStore=require('../../stores/filterStore.js');
var FilterGroup = require('./filterGroup.jsx');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

var Filter  = React.createClass({
    mixins: [Reflux.connect(FilterStore)],

    componentDidMount: function() {
    },
    
    componentWillMount :function(){   
    
    },

    componentWillUnmount: function() {
    },

    componentDidUpdate:function( prevProps,  prevState){
       
    },

    render: function() {
      var filters = FilterMap.filters;
        return(
          <TabbedArea defaultActiveKey={1}>
            {
              filters.map(function(item){
                var label = item.label + " (" + FilterStore.getAllSelected(item.key).length + "/" + FilterStore.getAll(item.key).length + ")";
                return <TabPane eventKey={parseInt(item.index)} tab={label}>
                  <FilterGroup filter={item}/>
                </TabPane>
              })
            }                 
          </TabbedArea>
        );
        
    }
});

module.exports = Filter;