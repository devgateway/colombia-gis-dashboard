'use strict';
var React = require('react');
var Reflux = require('reflux');
var RouteHandler = require('react-router').RouteHandler;
var LanSelector=require('./lanSelector.jsx');
var SaveStore=require('../stores/saveStore.js');
var SaveActions=require('../actions/saveActions.js');
var SaveStore=require('../stores/saveStore.js');

var AGOLProfile=require('./esri/AGOLProfile.jsx');
module.exports = React.createClass({

  componentDidMount:function(){
    document.getElementById('exitSaveMapPopup').onclick = function() {
        var dialog = document.getElementById('saveMapPopup');
        dialog.close();
    };
  },

  handleClickForSave:function(){
    console.log('Save Map');
    SaveActions.saveMap();
    var dialog = document.getElementById('saveMapPopup');
    dialog.show();

  },

  handleClickForRestore:function(){
    console.log('Save Map');
    SaveActions.restoreMap();
  },

  render: function() {
    return (
            <div>
              <div className="navbar navbar-fixed-top map-header">
                <div className="navbar-inner">
                  <div className="container-fluid" role="main">
                    <h1> <Message message="app.description"/> </h1>
                    <h2> <Message message="app.title"/></h2>
                    <div className="header-nav">
                      <AGOLProfile/>
                      <a href="#">Menu</a>&nbsp;&nbsp;
                      <a href="#" onClick={this.handleClickForSave.bind(this)}>Save</a>&nbsp;&nbsp;
                      <a href="#" onClick={this.handleClickForRestore.bind(this)}>Restore</a>
                      <LanSelector/>
                    </div>

                  </div>
                </div>
              </div>
              <dialog className="saveMapPopup" id="saveMapPopup">
                    <div className="panel panel-default">
        
                        this is the new panel

                    </div>
                  <h3>Save Window!</h3>
                  <p>Html for save functionality should be here! </p>
                  <button id="exitSaveMapPopup">Close Dialog</button>
              </dialog>
            </div>
    );
  }
});
