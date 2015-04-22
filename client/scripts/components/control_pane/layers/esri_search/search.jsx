'use strict';
var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var ArcgisLayersActions=require('../../../../actions/arcgisLayersActions.js');
var ResultList=require('./results.jsx');
var _=require('lodash');
var CustomCheckbox = require('../../../commons/customCheckbox.jsx');

/*The button to add the layer to the map*/



var SearchInput=React.createClass({

	handleCLick:function(){
		this.setState(_.assign(this.state,{"query":this.refs.search_input.getDOMNode().value}));
		this.props.onSearch(this.state);
	},

	getInitialState: function() {

		return {'feature': true,'image':true,'map':true ,'start':0 ,'num':500};
	},

	checkOption:function(value, selected){
		var newState={};
		newState[value]=selected;
		this.setState(newState);
	},


	render: function() {
		console.log("layers->search->search: Render EsriSearch");
		return(
			<div className="text-search-wrapper">
			<div className="search-box">
				<button type="submit" className="search-button" onClick={this.handleCLick}>
					<i className="fa fa-search"></i>
				</button>
				<input className="keyword-search" type="text" placeholder="Search layer" ref="search_input"/>
			</div>
			<div>

			
			<div className="layer-search-options">
				<ul>
					<li>
						<CustomCheckbox 
                        	selected={this.state.feature}
                        	onChange={this.checkOption}
                        	value="feature"/>
							Feature Service
					</li>
					<li>
						<CustomCheckbox 
                        	selected={this.state.map}
                        	onChange={this.checkOption}
                        	value="map"/>
							Map Service
					</li>
					<li>
						<CustomCheckbox 
                        	selected={this.state.image}
                        	onChange={this.checkOption}
                        	value="image"/>
							Image Service
					</li>
				</ul>
			</div>
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
