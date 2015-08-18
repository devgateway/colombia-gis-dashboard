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
    var mapName = i18n.t("app.title");
    debugger;
    if(this.state.save && this.state.save.mapName){
      mapName=this.state.save.mapName;
    } 
    return (
            <div>
              <div className="navbar navbar-fixed-top map-header">
                <div className="navbar-inner">
                  <div className="container-fluid" role="main">
                    <h1> <Message message="app.description"/> </h1>
                    <h2> {mapName} </h2>
                    <div className="header-nav">
                      <AGOLProfile/>
                      <a href="#">{i18n.t('app.menu')}</a>&nbsp;&nbsp;
                      <NationalSubActivities/>&nbsp;&nbsp;
                      <LanSelector/>
                    </div>

                  </div>
                </div>
              </div>

            </div>
    );
  }
});
