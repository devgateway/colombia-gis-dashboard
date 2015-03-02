
/*http://facebook.github.io/react/docs/component-specs.html*/
var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;
var FilterActions = require('../../actions/filterActions.js');
var FilterStore=require('../../stores/filterStore.js');
var FilterGroup = require('./filterGroup.jsx');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

function getStateFromStores() {
  //return { filter: {
  return { 
    departaments: FilterStore.getAll("departaments"),
    departamentsSelected: FilterStore.getAllSelected("departaments"),
    municipalities: FilterStore.getAll("municipalities"),
    municipalitiesSelected: FilterStore.getAllSelected("municipalities"),
    developmentObjectives: FilterStore.getAll("developmentObjectives"),
    developmentObjectivesSelected: FilterStore.getAllSelected("developmentObjectives")
    //}
  };
}

var Filter  = React.createClass({
    mixins: [Reflux.connect(FilterStore)],

    componentDidMount: function() {
       
    },
    
    componentWillMount :function(){    
        FilterActions.getFilterListFromServer();       
    },

    componentWillUnmount: function() {
    },

   	componentDidUpdate:function( prevProps,  prevState){
	     //debugger;
       //this.setState(getStateFromStores());
    },

    render: function() {
        return(
          <TabbedArea defaultActiveKey={1}>             
              <TabPane eventKey={1} tab="Departaments">
                <FilterGroup filterType="departaments"/>
              </TabPane>
                     
            </TabbedArea>
        );
    }
});

module.exports = Filter;