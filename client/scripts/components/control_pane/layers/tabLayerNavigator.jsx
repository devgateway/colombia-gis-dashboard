'use strict';

var React = require('react');
var Reflux = require('reflux');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var DataLayersManager=require('./data_map_layers/manager.jsx');

var LayerControl=require('../../map/layers/esri/layerControl.jsx');

var EsriSearch = require('./esri_search/search.jsx');
var EsriLoginStore=require('../../../stores/arcgisLoginStore.js');
var ArcgisLayersActions=require('../../../actions/ArcgisLayersActions.js');
var ArcgisSearchStore=require('../../../stores/arcgisSearchStore.js');

module.exports  = React.createClass({

	mixins: [Reflux.connect(ArcgisSearchStore, 'esri'),
	Reflux.connect(EsriLoginStore, 'loginState')],

	onAddLayer: function(options){
		ArcgisLayersActions.loadLayer(options);
	},

	onSearch:function(options){
		ArcgisLayersActions.search(options);
	},

	_handleSelect:function(key){
		
		this.refs.tabbedArea.setState({
        activeKey: key,
        previousActiveKey: this.refs.tabbedArea.getActiveKey()
      });

		this.forceUpdate();
		
	},
	
	render: function() {
	
		var search=this.state.esri.search;
		var error=this.state.esri.error;
		var token=this.state.loginState.token || "";
		return (
			<div className="activity-nav">
			<TabbedArea ref="tabbedArea" className="activities" defaultActiveKey={1} onSelect={this._handleSelect}>
					<TabPane   key={1} eventKey={1} tab={<Message message="layers.mapLayers"/>} >
					<DataLayersManager/>
					<LayerControl/>
					</TabPane>

					<TabPane key={2} eventKey={2} tab={<Message message="layers.findExtLayers"/>}>
					<EsriSearch 
					onAddLayer={this.onAddLayer}
					onSearch={this.onSearch} 
					token={token}  
					error={error} 
					search={search}/>
					</TabPane>

			</TabbedArea>
			</div>
			);
	}
});
