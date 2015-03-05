'use strict';

var React = require('react');

var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var Basemaps=require('./baseMaps.jsx')
var Selector=require('./layers/selector.jsx')
var Manager=require('./layers/manager.jsx')
module.exports  = React.createClass({


  render: function() {
    return (
      <div className="fixed">
      <Basemaps/>       
      
      <TabbedArea defaultActiveKey={1}>
          <TabPane eventKey={1} tab="Data Selector">
              <Selector/>      
          </TabPane>
          <TabPane eventKey={2} tab="Contextual Layers">
            <Manager/>    
          </TabPane>
    
      </TabbedArea>
      </div>
    );
  }

});