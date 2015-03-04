'use strict';
var React = require('react')
var RouteHandler = require('react-router').RouteHandler;
var LanSelector=require('./lanSelector.jsx');
var Message=require('./lanMessage.jsx');

module.exports = React.createClass({
  render: function() {
    return (
              <div className="navbar navbar-fixed-top map-header">
                <div className="navbar-inner">
                  <div className="container" role="main">
                    <h1> <Message message="map.labelDescription"/> </h1>
                    <h2> <Message message="app.title"/></h2>
                    <div className="header-nav">
                     <LanSelector/>
                      <a href="#">Menu</a>
                    </div>
                  </div>
                </div>
              </div>
    );
  }
});


