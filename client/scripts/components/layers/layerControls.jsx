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
		
	},
	componentDidMount: function() {
		
        //this.unsubscribe = ArcgisLayerStore.listen(this.onStatusChange);
    },
    componentWillUnmount: function() {
    	
        //this.unsubscribe();
    },


    onAddLayer: function(service){
    	ArcgisLayersActions.addLayerToMap(service);
    },


    onSearch:function(val){
		console.log('Search layers with keyword '+val); //
		this.state.query.q='("'+val+'") AND access:public AND (type:"Feature Service" OR  type:"Map Service" OR type:"Image Service")';
		ArcgisLayersActions.search(this.state.query);
	},
	
	getInitialState: function() {
		return {
			query:{num:400,sortField:"title"},
		};
	},

	updateVisiblity:function(){
		ArcgisLayersActions.changeVisibility();
	},

	
	render: function() {
		var store=ArcgisLayerStore;
		console.log('layers layerControls -- Render')
		var all=this.state.arcgisState.all || [];
		var services=this.state.arcgisState.services || [];
		var token=this.state.loginState.token || "";

		return (  
			<TabbedArea defaultActiveKey={1}>
			<TabPane eventKey={1} tab="Map Layers">
			<DataLayerSelector/>   
			<LayerList services={services}  onChange={this.updateVisiblity}/>   
			</TabPane>
			
			<TabPane eventKey={2} tab="Find External Layers">
			<Search onAddLayer={this.onAddLayer} onSearch={this.onSearch} token={token}  services={all}  {...this.props}/>    
			</TabPane>

			</TabbedArea>
			);
	}
});



