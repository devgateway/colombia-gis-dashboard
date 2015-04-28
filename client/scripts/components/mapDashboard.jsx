
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Map=require('./map/map.jsx')
var DataLayer=require('./map/layers/data/dataLayers.jsx');
var EsriLayers=require('./map/layers/esri/esriLayers.jsx');
var AGOLbtnLogin=require('./esri/AGOLBtnLogin.jsx');

module.exports = React.createClass({
	render: function() {
		console.log('MapDashboard: Render');
		return (
			<div>
				<AGOLbtnLogin/>
				<Map>   	
					<DataLayer/>
					<EsriLayers/>
				</Map>
			</div>
			)
	}
});
