'use strict';

var React = require('react');

var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

var Filter=require('./filter.jsx')

module.exports  = React.createClass({

  render: function() {
    return (
      <div className="filter-type-wrapper">
        <TabbedArea className="filter-type-label" defaultActiveKey={1}>
          <TabPane className="" eventKey={1} tab={<Message message='filters.basicFilters'/>}>
              <Filter type="basic"/>
          </TabPane>
          <TabPane className="" eventKey={2} tab={<Message message='filters.advancedFilters'/>}>
              <Filter type="advanced"/>
          </TabPane>
        </TabbedArea>
      </div>
      );
  }

});
