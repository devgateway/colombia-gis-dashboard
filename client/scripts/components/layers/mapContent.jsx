'use strict';

var React = require('react');
var Reflux = require('reflux');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var Selector=require('./selector.jsx');
var LayerList=require('./layerList.jsx');
var Search=require('./search.jsx');

var ArcgisLayerStore=require('../../stores/arcgisLayerStore.jsx');
var ArcgisLayersActions=require('../../actions/ArcgisLayersActions.js')
var EsriLoginStore=require('../../stores/arcgisLoginStore.jsx');

module.exports  = React.createClass({

	mixins: [Reflux.connect(ArcgisLayerStore, 'arcgisState'),Reflux.connect(EsriLoginStore, 'loginState')],

	searchLayers:function(val){
		console.log('Search layers with keyword '+val);
		this.state.query.q='title:"'+val+'" AND access:public AND (type:"Feature Service" OR type:"Map Service")';
		ArcgisLayersActions.searchOnArcGis(this.state.query);
	},
	
	 getInitialState: function() {
	    return {
	    	query:{num:100},
	    };
	  },


	render: function() {
		
		return (  
				<TabbedArea defaultActiveKey={1}>
			
					<TabPane eventKey={1} tab="Map Layers">
						<Selector/>   
						<LayerList services={this.state.arcgisState.services}/>   
					</TabPane>
					<TabPane eventKey={2} tab="Find External Layers">
						<Search onSearch={this.searchLayers} token={this.state.loginState.token}  
															 services={this.state.arcgisState.all} 
															 {...this.props}/>    
					</TabPane>

				
			
				</TabbedArea>
			);
	}
});


 
