'use strict';

var React = require('react');
var Reflux = require('reflux');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var Selector=require('./selector.jsx');
var CurrentLayers=require('./arcgisLayerList.jsx');
var Search=require('./search.jsx');

var ArcgisLayerStore=require('../../stores/arcgisLayerStore.jsx');
var ExternalLayersActions=require('../../actions/externalLayersActions.js')



module.exports  = React.createClass({

	mixins: [Reflux.connect(ArcgisLayerStore, 'layers')],


	searchLayers:function(val){
		this.state.query.q='title:"'+val+'" AND access:public AND (type:"Feature Service" OR type:"Map Service")';
		ExternalLayersActions.searchOnArcGis(this.state.query);
	},
	

	 getInitialState: function() {
	    return {
	    	query:{num:100},
	    };
	  },


	render: function() {
		console.log("................RENDER MAP CONTENT .........................");
		return (  
				<TabbedArea defaultActiveKey={1}>

					<TabPane eventKey={1} tab="Data Layers">
						<Selector/>      
					</TabPane>

					<TabPane eventKey={2} tab="Find External Layers">
						<Search onSearch={this.searchLayers} layers={this.state.layers.all} {...this.props}/>    
					</TabPane>

					<TabPane eventKey={3} tab="Map Content ">
						<CurrentLayers layers={this.state.layers.current}/>    
					</TabPane>
				</TabbedArea>
			);
	}
});


 
