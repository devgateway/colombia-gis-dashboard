'use strict';

var React = require('react');
var Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;


var Root = require('./components/root.jsx');
var Map = require('./components/map.jsx');

var routes = (
  <Route name="main" path="/" handler={Root}>
    <Route name="map" path="map" handler={Map} />
    <DefaultRoute handler={Map}/>
  </Route>
);

var router = Router.create({
  routes: routes,
});


module.exports = router;
