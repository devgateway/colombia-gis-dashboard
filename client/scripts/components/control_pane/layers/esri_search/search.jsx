'use strict';
var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var ArcgisLayersActions=require('../../../../actions/arcgisLayersActions.js');
var ResultList=require('./results.jsx');
var _=require('lodash');

/*The button to add the layer to the map*/



var SearchInput=React.createClass({

	handleCLick:function(){
		this.setState(_.assign(this.state,{"query":this.refs.search_input.getDOMNode().value}));
		this.props.onSearch(this.state);
	},

	getInitialState: function() {
		
		return {'feature': true,'image':true,'map':true ,'start':0 ,'num':500};
	},

	checkOption:function(evnt){
		var newState={};
		newState[evnt.target.value]=evnt.target.checked;
		this.setState(newState);
	},


	render: function() {
		console.log("layers->search->search: Render EsriSearch");
		return(  
			<div>
			<p><Message message="layers.search"/></p>
			<input type="text" placeholder="Search layer"  ref="search_input"/> 
			<button onClick={this.handleCLick}>Search</button>
			<div> 
			&nbsp;<input type="checkbox" value="feature" onClick={this.checkOption} checked={this.state.feature}/> Feature Service
			&nbsp;<input type="checkbox" value="map" onClick={this.checkOption} checked={this.state.map}/> Map Service
			&nbsp;<input type="checkbox" value="image" onClick={this.checkOption} checked={this.state.image}/> Image Service
			
			</div>
			</div>
			);
	}	
});

/*
  Root Element input text + search list
  */
  module.exports  = React.createClass({
  	render: function() {
  		console.log("layers->search->search: Render Layer Search");
  		return (  
  			<div>
  		<SearchInput  {...this.props /* passing properties down to sub components*/}/>
  	{this.props.services?   <ResultList {...this.props /* passing properties down to sub components*/}/>:null}
  	</div>
  	);
  	}
  });