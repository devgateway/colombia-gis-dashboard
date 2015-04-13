'use strict';

var React = require('react');
var Reflux = require('reflux');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');



var ArcgisLayersActions=require('../../actions/ArcgisLayersActions.js')
var EsriLoginStore=require('../../stores/arcgisLoginStore.jsx');
var ArcgisLayerStore=require('../../stores/arcgisLayerStore.jsx');


var DataLayerManager=require('./dataLayerManager.jsx');
var EsriLayerManager=require('./esri_manager/esriLayerManager.jsx');
var Search=require('./search/search.jsx');



module.exports  = React.createClass({

	mixins: [Reflux.connect(ArcgisLayerStore, 'arcgisState'),Reflux.connect(EsriLoginStore, 'loginState')],
	
	componentWillMount:function(){
		console.log('layers->layerControls: componentWillMount ');	
	},
	componentDidMount: function() {
		console.log('layers->layerControls: componentDidMount ');
	},
	componentWillUnmount: function() {
		console.log('layers->layerControls: componentWillUnmount ');
	},

	_addLayer: function(service){
		ArcgisLayersActions.loadLayer(service);
	},

	_search:function(val){
		ArcgisLayersActions.search(val);
	},

	_updateVisiblity:function(){

		ArcgisLayersActions.changeVisibility();
	},

	render: function() {
		var store=ArcgisLayerStore;
		var all=this.state.arcgisState.all || [];
		var services=this.state.arcgisState.services || [];
		var token=this.state.loginState.token || "";
		var error=this.state.arcgisState.error;

		return ( 

			<TabbedArea defaultActiveKey={1}>
			<TabPane eventKey={1} tab="Data Layers">
			<DataLayerManager/>   
			</TabPane>

			<TabPane eventKey={2} tab="Esri Layers">
			<EsriLayerManager services={services}  onChange={this._updateVisiblity}/>   
			</TabPane>
			
			<TabPane eventKey={3} tab="Find External Layers">
			<Search onAddLayer={this._addLayer} onSearch={this._search} token={token}  error={error} services={all}  {...this.props}/>    
			</TabPane>

			</TabbedArea>
			);
	}
});



