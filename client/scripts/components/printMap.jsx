
'use strict';


var React = require('react/addons');
var Router = require('react-router'),Route = Router.Route,  RouteHandler = require('react-router').RouteHandler;

var Reflux = require('reflux');
var Map=require('./map/map.jsx');
var SlideBar=require('./commons/slideBar.jsx');
var TabNavigator=require('./control_pane/tabNavigator.jsx');
var Map=require('./map/map.jsx');

module.exports = React.createClass({

	
	render: function() {
		return (
			<div>
				<Map ref="map"></Map>
			</div>
			)
	}
});
