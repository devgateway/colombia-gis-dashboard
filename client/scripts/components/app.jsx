'use strict';

var React = require('react/addons');
var Router = require('react-router'), Route = Router.Route, DefaultRoute = Router.DefaultRoute;
var RouteHandler = require('react-router').RouteHandler;


module.exports =React.createClass({
	render: function() {
		return (
			<div>

				{/* defer to the child route handler */}
				<RouteHandler {...this.props}/>

			</div>
		);
	}
});
