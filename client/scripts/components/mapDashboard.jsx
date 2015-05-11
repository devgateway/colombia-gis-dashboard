
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Map=require('./map/map.jsx');
var DataLayer=require('./map/layers/data/dataLayers.jsx');
var EsriLayers=require('./map/layers/esri/esriLayers.jsx');
var AGOLbtnLogin=require('./esri/AGOLBtnLogin.jsx');
var LayerControl=require('./map/layers/manager/layerControl.jsx');

var SlideBar=require('./commons/slideBar.jsx');
var TabNavigator=require('./control_pane/tabNavigator.jsx');

module.exports = React.createClass({


	_getMap:function(){
		return this.refs.map.getMap();
	},

	_getControl:function(){
		return this.refs.map.getControl();
	},

	_onAddLayer:function(layer){
		this.refs.tabNavigator.addLayerToControl(layer);
	},

	render: function() {
		console.log(' MapDashboard: Render');
		return (
			<div>
			<SlideBar>
				<TabNavigator getMap={this._getMap}   />;	
			</SlideBar>
			<Map ref="map" onAddLayer={this._onAddLayer}></Map>
			</div>
			)
	}
});
