
'use strict';


var React = require('react/addons');
var Router = require('react-router'),Route = Router.Route,  RouteHandler = require('react-router').RouteHandler;
var Reflux = require('reflux');
var Map=require('../map/map.jsx');

module.exports = React.createClass({

	
	render: function() {
		return (
			<div>
				<Map ref="map"></Map>
			</div>
			)
	}
});
