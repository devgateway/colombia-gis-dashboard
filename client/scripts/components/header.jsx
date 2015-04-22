'use strict';
var React = require('react')
var RouteHandler = require('react-router').RouteHandler;
var LanSelector=require('./lanSelector.jsx');

var AGOLProfile=require('./esri/AGOLProfile.jsx');
module.exports = React.createClass({
  render: function() {
    return (
              <div className="navbar navbar-fixed-top map-header">
                <div className="navbar-inner">
                  <div className="container-fluid" role="main">
                    <h1> <Message message="app.description"/> </h1>
                    <h2> <Message message="app.title"/></h2>
                    <div className="header-nav">
                      <AGOLProfile/>
                      <a href="#">Menu</a>
                      <LanSelector/>
                    </div>

                  </div>
                </div>
              </div>
    );
  }
});
