'use strict';
var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var Message=require('../lanMessage.jsx');
var ArcgisLayersActions=require('../../actions/arcgisLoginActions.js');

/*The button to add the layer to the map*/
var AddButton= React.createClass({
	handleAdd:function(){
		ArcgisLayersActions.addLayerToMap(this.props.service);
	},

	render: function() {
		return(<button disabled={this.props.disabled} 
			className={this.props.disabled?"btn btn-xs btn-default":"btn btn-xs btn-info"} onClick={this.handleAdd}>ADD</button>);	
	}

});

var EsriService=React.createClass({
	componentWillReceiveProps: function(nextProps) {
		console.log("componentWillReceiveProps EsriService");
	},

	render: function() {
		var service=this.props.service;
		return(
			<li>
			<div className="title" data-toggle="Loing is required">{service.title} {service.loginRequired?<i className="text-warning small">Loing is required</i>:''}</div>
			<div className="thumbnail"><img width="90px" height="60px" src={"http://www.arcgis.com/sharing/content/items/"+service.id+"/info/"+service.thumbnail}/></div>
			<div className="type">{service.type}</div>
			<div className="add"> 
			<AddButton service={service} disabled={(service.loginRequired && !this.props.token)?true:false}/>
			</div>
			</li>
			)	
	}
});

/*The result list it should be an infinite scroll maybe */
var EsriServiceList= React.createClass({

	componentWillReceiveProps: function(nextProps) {
		console.log("componentWillReceiveProps EsriServiceList");
	},

	moreResults: function(){
		alert('Load More!');
	},

	render: function() {
		console.log("Render EsriServiceList");
		return(<ul className="esri-result-list small">
		{ 
			this.props.services.map(function(s){
				return( <EsriService token={this.props.token} service={s} />)
			}.bind(this))}
			<li><a onClick={this.moreResults}>More results</a></li>
			</ul>);	
	}	
});
/*The input text*/

var EsriSearch=React.createClass({

	handleCLick:function(){
		this.props.onSearch(this.refs.search_input.getDOMNode().value);
	},

	render: function() {
		console.log("Render EsriSearch");
		return   (  
			<div>
			<p><Message message="layers.search"/></p>
			<input type="text" placeholder="Search layer"  ref="search_input"/> 
			<button onClick={this.handleCLick}>GO</button>
			</div>
			);
	}	
});

/*
  Root Element input text + search list

  */
  module.exports  = React.createClass({
  	render: function() {
  		console.log("Render Layer Search");
  		return (  
  			<div>
  			
  			<EsriSearch  {...this.props /* passing properties down to sub components*/}/>

  			{this.props.services?   <EsriServiceList {...this.props /* passing properties down to sub components*/}/>:null}
  			
  			</div>
  			);
  	}
  });