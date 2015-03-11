'use strict';
var React = require('react');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var Basemaps=require('./baseMaps.jsx');
var MapContent=require('./layers/mapContent.jsx');

module.exports  = React.createClass({


  render: function() {
    return (
    <div className="fixed">
      <Basemaps/>  
      <TabbedArea defaultActiveKey={1}>
      <TabPane eventKey={1} tab="Map Content">
        <MapContent/>
      </TabPane>
    </TabbedArea>

  </div>
  );
  }

});