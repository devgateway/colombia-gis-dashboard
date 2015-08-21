
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Map=require('./map/map.jsx');
var SlideBar=require('./commons/slideBar.jsx');
var TabNavigator=require('./control_pane/tabNavigator.jsx');

var AGOLbtnLogin=require('./esri/AGOLBtnLogin.jsx');
var LegendControl = require('./map/layers/legends/legendControl.jsx');
var TimeSliderControl=require('./map/layers/timeSliderControl.jsx');

module.exports = React.createClass({

	render: function() {
		console.log(' MapDashboard: Render');
		return (
			<div>
			<SlideBar>
			<TabNavigator />;	
			</SlideBar>
			
			<Map ref="map">
				<AGOLbtnLogin/>
				<LegendControl/>
				<TimeSliderControl/>
			</Map>
			</div>
			)
	}
});
