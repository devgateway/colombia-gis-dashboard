
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


var Filter  = React.createClass({
    mixins: [Reflux.connect(FilterStore)],

    componentDidMount: function() {
    },
    
    componentWillMount :function(){    
        FilterActions.getDepartamentsList();       
        FilterActions.getMunicipalitiesList();       
    },

    componentWillUnmount: function() {
    },

   	componentDidUpdate:function( prevProps,  prevState){
	     
    },

    render: function() {
      debugger;
        return(
          <TabbedArea defaultActiveKey={1}>   
              <TabPane eventKey={1} tab="Departaments">
                 Selected {FilterStore.getAllSelected('departaments').length} from {FilterStore.getAll('departaments').length}
                <FilterGroup filterType="departaments"/>
              </TabPane>
              <TabPane eventKey={2} tab="Municipalities">
                 Selected {FilterStore.getAllSelected('municipalities').length} from {FilterStore.getAll('municipalities').length}
                <FilterGroup filterType="municipalities"/>
              </TabPane>
                     
            </TabbedArea>
        );
    }
});

module.exports = Filter;