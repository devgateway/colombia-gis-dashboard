'use strict';
var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var Message=require('../lanMessage.jsx');
var ExternalLayersActions=require('../../actions/externalLayersActions.js');

/*The button to add the layer to the map*/
var AddButton= React.createClass({
	handleAdd:function(){
		ExternalLayersActions.addLayerToMap(this.props.layer);
	},

	render: function() {
		return(<button className="btn btn-xs btn-info" onClick={this.handleAdd}>ADD</button>);	
	}

});


/*The result list it should be an infinite scroll maybe */
var List= React.createClass({
	render: function() {
		return(<div className="scrollable small">
		{ 
			this.props.layers.map(function(l){
				return(
					<div>
					<p>{l.title}</p>
					<div>
					<img src={"http://www.arcgis.com/sharing/content/items/"+l.id+"/info/"+l.thumbnail}/>
					<b>{l.type}</b>

					<AddButton layer={l}/>
					</div>
					</div>)
			})}
			</div>);	
	}	
});


var Search=React.createClass({

	handleCLick:function(){
		this.props.onSearch(this.refs.search_input.getDOMNode().value);
	},

	render: function() {
		return   (  
			<div>
				<p><Message message="layers.search"/></p>
				<input type="text" placeholder="Search layer"  ref="search_input"/> <button onClick={this.handleCLick}>GO</button>
			</div>
			);
	}	
});

/*
  Root Element input text + search list

  */
  module.exports  = React.createClass({
  	render: function() {
  		return (  
  			<div>
	  			<Search onSearch={this.props.onSearch}/>
	  			<div>	
	  				{this.props.layers?  <List layers={this.props.layers}/>:null}
	  			</div>
	  		</div>
  			);
  	}
  });