'use strict';

var React = require('react/addons');
var Router = require('react-router'), Route = Router.Route,  DefaultRoute = Router.DefaultRoute;
var RouteHandler = require('react-router').RouteHandler;
var Redirect = require('react-router').Redirect;
var Map = require('./components/map/map.jsx');
var AGOLConfirm= require('./components/esri/AGOLConfirm.jsx');
var APP=require('./components/app.jsx'); // basic page without layout
var MapLayout=require('./components/mapLayout.jsx');

debugger;
var routes = (
		<Route name="app" path="/" handler={APP}>
			
			<Route name="main" path="/main" handler={MapLayout}>
				<Route name="map" path="/map" handler={Map} />
			</Route>

			<Route name="arcLogin" path="/arcLogin*" handler={AGOLConfirm} />
			
			<Redirect from="/" to="map"/>
		</Route>
	);

var router = Router.create({
	routes: routes,
});

module.exports = router;
