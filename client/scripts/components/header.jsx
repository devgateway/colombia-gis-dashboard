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


              <dialog className="panel panel-default dialog-save-map" id="saveMapPopup">
              <div className="panel-heading">
                <h3><i className="fa fa-folder-open"></i><Message message='savemap.savemaplabel'/></h3>
                <a class="leaflet-popup-close-button" href="#close"><i className="fa fa-times-circle-o"></i></a>
              </div>

              <div className="panel-body panel-body-savemap">

                  <input className="form-control" type="text" placeholder={i18n.t('savemap.savemaptitle')} ref=""/>
                  <textarea className="form-control" rows="3" placeholder={i18n.t('savemap.savemapdescription')}></textarea>
            
              </div>

            <div className="panel-body-savemap plain">
              <h3><Message message='savemap.savemaptags'/></h3>
              <input className="form-control taginput" type="text" ref=""/>

              <div className="input-group">
                <h4><Message message='savemap.savemapvisibility'/></h4>

                <div className="layer-search-options">
                <ul>
                  <li><span className="selectable selected"></span><Message message='savemap.savemapprivate'/></li>
                  <li><span className="selectable"></span><Message message='savemap.savemappublic'/></li>
                </ul>
                </div>
              </div>

              <button type="button" className="btn btn-apply" role="button" id="exitSaveMapPopup"><span>Save Map</span></button>
            </div>

              </dialog>
            </div>
    );
  }
});
