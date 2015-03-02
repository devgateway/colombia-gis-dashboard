'use strict';

var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var Filter = require('../filters/filter.jsx');
var BaseMaps = require('../baseMaps.jsx');

var LayerSelector=require('../layers/selector.jsx');
var LayerManager=require('../layers/manager.jsx');

module.exports  = React.createClass({

//  mixins: [Reflux.connect(MetaStore)],

  render: function() {
    return (
      <div className="fixed">
      <div>
        <BaseMaps/>
      </div>
      <TabbedArea defaultActiveKey={2}>
 
        <TabPane eventKey={1} tab="Tab 2">
              <LayerSelector/>
              <LayerManager/>
          </TabPane>
        <TabPane eventKey={2} tab="Tab 2">LAYERS</TabPane>
        <TabPane eventKey={3} tab="Filters"><Filter/></TabPane>
        <TabPane eventKey={4} tab="Tab 2">PROJECTS</TabPane>
      </TabbedArea>
      </div>
    );
  }

});