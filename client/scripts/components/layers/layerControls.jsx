'use strict';

var React = require('react');
var Reflux = require('reflux');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var DataLayerSelector=require('./dataLayerSelector.jsx');
var LayerList=require('./manager/list.jsx');
var Search=require('./search/search.jsx');
var ArcgisLayersActions=require('../../actions/ArcgisLayersActions.js')
var EsriLoginStore=require('../../stores/arcgisLoginStore.jsx');
var ArcgisLayerStore=require('../../stores/arcgisLayerStore.jsx');

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
		var store=ArcgisLayerStore;
		console.log('layers->layerControls: rendering');
		var all=this.state.arcgisState.all || [];
		var services=this.state.arcgisState.services || [];
		var token=this.state.loginState.token || "";
		var error=this.state.arcgisState.error;
	
		return ( 

			<TabbedArea defaultActiveKey={1}>
			<TabPane eventKey={1} tab="Map Layers">
			<DataLayerSelector/>   
				<LayerList services={services}  onChange={this.updateVisiblity}/>   
			</TabPane>
			
			<TabPane eventKey={2} tab="Find External Layers">
			
				<Search onAddLayer={this.onAddLayer} onSearch={this.onSearch} token={token}  error={error} services={all}  {...this.props}/>    
			</TabPane>

			</TabbedArea>
			);
	}
});



