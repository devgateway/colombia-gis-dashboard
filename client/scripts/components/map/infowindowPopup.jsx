'use strict';

var React = require('react/addons');
var Router = require('react-router'), Route = Router.Route, DefaultRoute = Router.DefaultRoute;
var RouteHandler = require('react-router').RouteHandler;



module.exports  = React.createClass({

  render: function() {
      console.log('infoWindow>render');
      return (<div className="map-panel-header">
          <RouteHandler {...this.props}/>
        </div>);
    }
});