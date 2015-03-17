'use strict';

var React = require('react');

var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var Basemaps=require('./baseMaps.jsx')
var Selector=require('./layers/selector.jsx')
var MapContent=require('./layers/mapContent.jsx')
var Filter=require('./filters/filter.jsx')
module.exports  = React.createClass({


  render: function() {
    return (
      <div className="fixed" id="map-panel">
        <Basemaps/>       
      <TabbedArea className="tabs" role="tablist" defaultActiveKey={1}>
        <TabPane className="YYY" eventKey={1} tab="Map Content">
               <MapContent/>    
             
        </TabPane>
        <TabPane className="YYY" eventKey={3} tab="Filters">
            <Filter/>    
        </TabPane>

      </TabbedArea>
      </div>
      );
  }

});