'use strict';
var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var Message=require('../../lanMessage.jsx');
var ArcgisLayersActions=require('../../../actions/arcgisLayersActions.js');
var ResultList=require('./resultList.jsx');
/*The button to add the layer to the map*/



var SearchInput=React.createClass({

	handleCLick:function(){
		this.props.onSearch(this.refs.search_input.getDOMNode().value);
	},

	render: function() {
		console.log("Render EsriSearch");
		return(  
			<div>
			    <p><Message message="layers.search"/></p>
			    <input type="text" placeholder="Search layer"  ref="search_input"/> 
			    <button onClick={this.handleCLick}>Search</button>
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
	  			<SearchInput  {...this.props /* passing properties down to sub components*/}/>
	  			{this.props.services?   <ResultList {...this.props /* passing properties down to sub components*/}/>:null}
	  		</div>
  			);
  	}
  });