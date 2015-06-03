
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Map=require('./map/map.jsx');
var SlideBar=require('./commons/slideBar.jsx');
var TabNavigator=require('./control_pane/tabNavigator.jsx');

module.exports = React.createClass({

	render: function() {
		console.log(' MapDashboard: Render');
		return (
			<div>
			<SlideBar>
			<TabNavigator />;	
			</SlideBar>
			<Map ref="map" onAddLayer={this._onAddLayer}></Map>
			</div>
			)
	}
});
