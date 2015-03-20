'use strict';

var React = require('react');
var Reflux = require('reflux');
var ArcgisLayerStore=require('../../../stores/arcgisLayerStore.jsx')
var token='2QcB84Fheuqexz7FenUQBpJzDif-Kvjzb7Ea7J8FpTUZE4hcNX_RBtAjC9PQaz2SLjXQzFQu8JeSpbv9Q6kH0BntJvE0dhsyI_E_H6BQgaQbeqTYTy9fyXKnp5VkR9VeUfjAMIVFWDCI9HRL3eRmwg..';
var _=require('lodash');
/*
var FeatureServer=React.createClass({});

var ImageServer=React.createClass({});
*/

var callback=function(){
	debugger;
	console.log(arguments);
};


var commonsMixins= {

	componentWillUnmount:function(){
		this.getMap().removeLayer(this.layer)
	},

	getMap:function(){
		return this.props.getMap();
	},

	getService:function(){
		return this.props.service;
	},

	getVisibleIds:function(layers){
		return layers_.findWhere({defaultVisibility:true}).map(function(l){return l.id});
	},

	loadLayer:function(LConstructor,options,url){
		var uri=url||this.getService().metadata.url;

		var layer=LConstructor(uri,_.assign({useCors:true,token:token},options));
		layer.addTo(this.getMap());
		this.layer=layer;
		layer.on('load', function(e){
			console.log('Layer has been loaed .....')
		});
	},
};

/*A feature service*/
var FeatureServer=React.createClass({
	mixins:[commonsMixins],
	

	snapShootLayer:function(url){
		L.esri.Tasks.query({url: url, token:token}).run(
			function(error, features){
				this.layer = L.geoJson(features).addTo(this.props.getMap()); 
				this.props.getMap().fitBounds(layer.getBounds().pad(0.5));
				this.layer.addTo(this.props.getMap()); 
			}.bind(this));
	},

	componentWillMount:function(){
		var service=this.getService();
		service.layers.map(function(layer){
			
			this.loadLayer(L.esri.featureLayer,{},service.metadata.url+'/'+layer.id);
			
		}.bind(this));
	},
	
	

	render:function() {

		return null;
	}


});

var MapSever=React.createClass({
	mixins:[commonsMixins],
	
	componentWillMount:function(){
		this.loadLayer( L.esri.dynamicMapLayer);
	},


	render:function() {
		return null;
	}
});


var TiledMapServer=React.createClass({
	mixins:[commonsMixins],

	componentWillMount:function(){
		this.loadLayer(L.esri.tiledMapLayer);
	},

	

	render:function() {
		return null;
	}
});

var ImageServer=React.createClass({
	mixins:[commonsMixins],

	componentWillMount:function(){
		debugger;
		this.loadLayer(L.esri.imageMapLayer);
	},

	render:function() {
		return null;
	}
});



var  Service=React.createClass({
	render: function() {
		var Layer;
		if (this.props.service.metadata.type==="Map Service"){
			if (this.props.service.singleFusedMapCache){
				Layer=TiledMapServer;
			}else{
				Layer=MapSever;
			}
		} 
		if (this.props.service.metadata.type==="Feature Service"){
			Layer=FeatureServer;
		}
		if (this.props.service.metadata.type==="Image Service"){
			Layer=ImageServer;	
		}
		return (<Layer {...this.props}/>);
	}
});

module.exports  = React.createClass({
	mixins: [Reflux.connect(ArcgisLayerStore, 'layers')],
	render: function() {
		var visibleServices=_.filter(this.state.layers.services,{defaultVisibility:true}) || [];

		return (<div>{
			visibleServices.map(function(service){
				return <Service {...this.props} service={service}/>
			}.bind(this))
		}</div>);
	}
});