'use strict';

var React = require('react');

var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

var Basemaps=require('../map/baseMap.jsx')
var TabLayerNavigator=require('./../map/tabLayerNavigator.jsx');

var SaveActions=require('../../actions/saveActions.js');
var SaveMap=require('../storedMaps/saveDialog.jsx');

var Filter=require('./../filters/filtersManager.jsx');
var StoredMaps=require('../storedMaps/mapList.jsx');


module.exports  = React.createClass({

  componentDidMount: function(){
      $(this.getDOMNode()).mCustomScrollbar({theme:"inset-dark"}); //TODO: can't this be done by a css??
      $( "#saveMapPopup" ).hide();
  },

  open:function(){
    SaveActions.showModal('save')
  },

  render: function() {
    return (
      <div className="fixed" id="map-panel" >
        <Basemaps/>
        <div className="non-btn-action pull-right">
        <a href="#" data-toggle="modal" data-target="#myModal" onClick={this.open}>
          <i className="fa fa-download"></i><Message message='savemap.exportsavebutton'/>
        </a>
        </div>
        <TabbedArea className="tabs main-tabs" role="tablist" defaultActiveKey={1}>
          <TabPane className="" eventKey={1} tab={<Message message='layers.title'/>}>
            <TabLayerNavigator/>
          </TabPane>
          <TabPane className="filtertab" eventKey={2} tab={<Message message='filters.title'/>}>
              <Filter/>
          </TabPane>
        <TabPane className="" eventKey={3} tab={<Message message='savemap.savedmapstab'/>}>
              <StoredMaps/>
          </TabPane>
        </TabbedArea>
        <SaveMap/>
      </div>
      );
  }

});
