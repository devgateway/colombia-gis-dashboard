'use strict';

var React = require('react/addons');
var Router = require('react-router'), Route = Router.Route,  DefaultRoute = Router.DefaultRoute;
var RouteHandler = require('react-router').RouteHandler;
var Redirect = require('react-router').Redirect;
var Map = require('./components/mapDashboard.jsx');
var Chart = require('./components/map/charts/chart1.jsx');
var AGOLConfirm= require('./components/esri/AGOLConfirm.jsx');
var APP=require('./components/app.jsx'); // basic page without layout
var MapLayout=require('./components/mapLayout.jsx');
var InfowindowPopup=require('./components/map/infowindowPopup.jsx');
var PrintHandler=require('./components/print/printLayout.jsx');
var PrintMap=require('./components/print/printMap.jsx');
var PrintSkeleton=require('./components/print/printSkeleton.jsx');

var routes = (
		<Route name='app' path='/' handler={APP}>			
			<Route name='main' path='/main' handler={MapLayout}> 
				<Route name='map' path='/map' handler={Map} />
			</Route>
			
			<Route name='arcLogin' path='/arcLogin*' handler={AGOLConfirm} />
			
			<Route name='infowindow' path='/infowindow' handler={InfowindowPopup} >
				<Route name='chart1' path='/chart1' handler={Chart} />
			</Route>

			<Route name='print' path='/print' handler={PrintHandler}>
				<Route name='printMap' path='/print/map/:id' handler={PrintMap} />
				<Route name='printSkeleton' path='/print/skeleton/:id' handler={PrintSkeleton} />
			</Route>
			<Redirect from='/' to='map'/>
		</Route>
	);

var router = Router.create({
	routes: routes,
});

module.exports = router;
