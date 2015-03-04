'use strict';
var React = require('react')
var RouteHandler = require('react-router').RouteHandler;
var Message=require('./lanMessage.jsx');
module.exports = React.createClass({
  render: function() {
    return (
            <nav className="nav navbar-inverse navbar-fixed-bottom map-footer">
                <div className="container">
                  <a className="navbar-brand" href="#">
                    <img src="images/usaid-logo.png" className="logo"/>
                    <Message message="app.credits"/> 
                  </a>
                </div>
              </nav>
    );
  }
});


