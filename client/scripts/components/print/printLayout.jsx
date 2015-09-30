'use strict';
var React = require('react/addons');
var Router = require('react-router'),Route = Router.Route,  RouteHandler = require('react-router').RouteHandler;
var Reflux = require('reflux');

module.exports = React.createClass({

	render: function() {
		return (
		<div>
			{/* defer to the child route handler */}
			<RouteHandler {...this.props}/>
		</div>
		);
	}
});
