'use strict';

var React = require('react');
var Reflux = require('reflux');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

var DataLayersManager=require('./data_map_layers/manager.jsx');
var EsriLayersManager=require('./esri_map_layers/manager.jsx')
var EsriSearch = require('./esri_search/search.jsx')

var ArcgisLayersActions=require('../../../actions/ArcgisLayersActions.js')
var EsriLoginStore=require('../../../stores/arcgisLoginStore.js');
var ArcgisLayerStore=require('../../../stores/arcgisLayerStore.js');

module.exports  = React.createClass({

	mixins: [Reflux.connect(ArcgisLayerStore, 'arcgisState'),Reflux.connect(EsriLoginStore, 'loginState')],

    onAddLayer: function(service){
    	ArcgisLayersActions.loadLayer(service);
    },

    onSearch:function(val){
		ArcgisLayersActions.search(val);
	},

	updateVisiblity:function(){

		ArcgisLayersActions.changeVisibility();
	},

	render: function() {

		var all=this.state.arcgisState.all || [];
		var services=this.state.arcgisState.services || [];
		var token=this.state.loginState.token || "";
		var error=this.state.arcgisState.error;
	
		return ( 

			<TabbedArea defaultActiveKey={1}>
			<TabPane eventKey={1} tab="Map Layers">
				
				<DataLayersManager/>   
				
				<EsriLayersManager services={services}  onChange={this.updateVisiblity}/>   
			
			</TabPane>
			
			<TabPane eventKey={2} tab="Find External Layers">
				<EsriSearch onAddLayer={this.onAddLayer} onSearch={this.onSearch} token={token}  error={error} services={all}  {...this.props}/>    
			</TabPane>

			</TabbedArea>
			);
	}
});


