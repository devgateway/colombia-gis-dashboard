'use strict';

var React = require('react/addons');
var Router = require('react-router'),

Route = Router.Route,
DefaultRoute = Router.DefaultRoute;

var RouteHandler = require('react-router').RouteHandler;
var Redirect = require('react-router').Redirect;


var SlideBar=require('./components/containers/slideBar.jsx');
var Header=require('./components/header.jsx');
var Footer=require('./components/footer.jsx');
var Controls=require('./components/controls.jsx');
var Map = require('./components/map/map.jsx');

var AGOLConfirm= require('./components/AGOLConfirm.jsx');
 



var APP=React.createClass({
	render: function() {
		return (
			<div>

		{/* defer to the child route handler */}
		<RouteHandler {...this.props}/>

		</div>
		);
	}
});


var Root= React.createClass({
	render: function() {
		return (
			<div>
			<Header/>
			<SlideBar>
			<Controls/>
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


var routes = (
	<Route name="app" path="/" handler={APP}>
	<Route name="main" path="/main" handler={Root}>
	<Route name="map" path="/map" handler={Map} />
	<DefaultRoute handler={Map}/>
	</Route>
	<Route name="arcLogin" path="/arcLogin*" handler={AGOLConfirm} />
	<Redirect from="/" to="map"/>
	</Route>
	);

var router = Router.create({
	routes: routes,
});


module.exports = router;
