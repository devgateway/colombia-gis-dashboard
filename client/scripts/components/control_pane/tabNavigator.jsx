'use strict';

var React = require('react');

var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

var Basemaps=require('../map/baseMap.jsx')
var TabLayerNavigator=require('./layers/tabLayerNavigator.jsx');


var Filter=require('./filters/filter.jsx');

module.exports  = React.createClass({


  componentDidMount: function(){
      $(this.getDOMNode()).mCustomScrollbar({theme:"inset-dark"}); //TODO: can't this be done by a css??  
  },

  render: function() {
    return (
      <div className="fixed" id="map-panel" >
        <Basemaps/>
        <TabbedArea className="tabs main-tabs" role="tablist" defaultActiveKey={1}>

          <TabPane className="" eventKey={1} tab="Map Content">
            <TabLayerNavigator/>
          </TabPane>

          <TabPane className="" eventKey={2} tab="Filters">
              <Filter/>
          </TabPane>

        </TabbedArea>
      </div>
      );
  }

});
