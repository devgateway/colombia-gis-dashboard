'use strict';
var React = require('react')
var RouteHandler = require('react-router').RouteHandler;

module.exports = React.createClass({
  render: function() {
    return (
              <div className="navbar navbar-fixed-top map-header">
                <div className="navbar-inner">
                  <div className="container" role="main">
                    <h1>Map Description: </h1>
                    <h2>This area can be translated as a written legend of what is being actualized on the map</h2>
                    <div className="header-nav">
                      <a href="#">Menu</a>
                    </div>
                  </div>
                </div>
              </div>
    );
  }
});


