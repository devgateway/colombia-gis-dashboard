'use strict';
var React = require('react');
var Reflux = require('reflux');
var RouteHandler = require('react-router').RouteHandler;
var LanSelector=require('./lanSelector.jsx');
var SaveStore=require('../stores/saveStore.js');
var NationalSubActivities=require('./map/nationalSubActivities.jsx')
var AGOLProfile=require('./esri/AGOLProfile.jsx');


module.exports = React.createClass({

  mixins: [Reflux.connect(SaveStore, 'save')],

  render: function() {
    return (
            <div>
              <div className="navbar navbar-fixed-top map-header">
                <div className="navbar-inner">
                  <div className="container-fluid" role="main">
                    <h1> <Message message="app.description"/> </h1>
                    <h2> {this.state.save && this.state.save.mapName? this.state.save.mapName : <Message message="app.title"/>} </h2>
                    <div className="header-nav">
                      <AGOLProfile/>
                      <li><a href="#"><Message message="app.menu"/></a></li>
                      <li><NationalSubActivities/></li>
                      <LanSelector/>
                    </div>

                  </div>
                </div>
              </div>

            </div>
    );
  }
});
