'use strict';
var React = require('react');
var Reflux = require('reflux');
var RouteHandler = require('react-router').RouteHandler;
var LanSelector=require('./lanSelector.jsx');
var SaveStore=require('../stores/saveStore.js');
var NationalSubActivities=require('./map/nationalSubActivities.jsx');
var AGOLProfile=require('./esri/AGOLProfile.jsx');
var PrintDialog=require('./storedMaps/printDialog.jsx');
var ImageDialog=require('./storedMaps/imageDialog.jsx');
var SaveDialog=require('./storedMaps/saveDialog.jsx');
var ExportDialog=require('./storedMaps/exportDialog.jsx');

module.exports = React.createClass({

  mixins: [Reflux.connect(SaveStore)],

  render: function() {
    return (
      <div>
        <div className='navbar navbar-fixed-top map-header'>
          <div className='navbar-inner'>
            <div className='container-fluid' role='main'>
              <h1> <Message message='app.description'/> </h1>
              <h2> {this.state.currentMap.title || <Message message='app.title'/>} </h2>
              <div className='header-nav'>
                <AGOLProfile/>                
                <ExportDialog/>
                <SaveDialog/>
                <PrintDialog id={this.state.currentMap? this.state.currentMap._id : null}/>
                <ImageDialog id={this.state.currentMap? this.state.currentMap._id : null}/>
                <li><a href='#'><Message message='app.menu'/></a></li>
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
