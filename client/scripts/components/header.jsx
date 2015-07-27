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
              <dialog className="panel panel-default panel-save-map" id="saveMapPopup">
              <div className="panel-heading">
              <h3><i class="fa fa-folder-open"></i>Save This Map</h3>
              <i className="fa fa-times-circle-o"></i>
              </div>
              <div className="panel-body">
              <div className="input-group">
              <input className="form-control" type="text" placeholder={i18n.t('savemap.savemaptitle')} ref=""/>
              <textarea className="form-control" rows="3"></textarea>

              </div>
              </div>

<div class="row">
<div class="col-md-10 col-md-offset-2">

<button type="button" class="btn btn-apply space-left" role="button" id="exitSaveMapPopup"><span>Save Map</span></button>

</div>

</div>



              </dialog>
            </div>
    );
  }
});
