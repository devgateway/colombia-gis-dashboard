'use strict';

var React = require('react/addons');
var Router = require('react-router'),Route = Router.Route,  RouteHandler = require('react-router').RouteHandler;

var Header=require('./header.jsx') ,
SlideBar=require('./commons/slideBar.jsx'),
Footer=require('./footer.jsx'),
ControlPane=require('./control_pane/tabNavigator.jsx');


var actions=require('../actions/startUpActions.js');

module.exports = React.createClass({

	componentDidMount:function(){
		/*trigger startup actions*/
		actions.loadActivitiesByDepartments();
		actions.getAllListsFromAPI();
	},

	render: function() {
		return (
			<div>
			<Header/>
				<SlideBar>
					<ControlPane/>
				</SlideBar>
				<div id="map-container">
					{/* defer to the child route handler */}
					<RouteHandler {...this.props}/>
				</div>
			<Footer/>
			</div>
		);
	}
});
