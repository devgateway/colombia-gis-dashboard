'use strict';
var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var ArcgisLayersActions=require('../../../../actions/arcgisLayersActions.js');
var Results=require('./results.jsx');
var _=require('lodash');
var CustomCheckbox = require('../../../commons/customCheckbox.jsx');


var SearchInput=React.createClass({

	handleCLick:function(){
		this.setState(_.assign(this.state,{"query":this.refs.search_input.getDOMNode().value}));
		this.props.onSearch(this.state);
	},

	handleOnkeypress:function(key){
		if(key.which==13){
			this.handleCLick();
		}

	},

	getInitialState: function() {
		return {'feature': true,'image':true,'map':true ,'start':0 ,'num':20};
	},

	checkOption:function(value, selected){
		var newState={};
		newState[value]=selected;
 		this.setState(newState);
	},

	render: function() {
		console.log("layers->search->search: Render EsriSearch");
		return(
				<div class="layer-search-wrapper">
					<div className="text-search-wrapper">
						<div className="search-box">
						<button type="submit" className="search-button" onClick={this.handleCLick}>
							<i className="fa fa-search"></i>
						</button>
						<input onKeyPress={this.handleOnkeypress} className="keyword-search" type="text" placeholder="Search layer" ref="search_input"/>
					</div>
				</div>
					<div className="layer-search-options">
					<ul>
						<li>
							<CustomCheckbox selected={this.state.feature} onChange={this.checkOption} value="feature"/>
							Feature Service
						</li>
						<li>
							<CustomCheckbox selected={this.state.feature} onChange={this.checkOption} value="map"/>
							Map Service
						</li>
						<li>
							<CustomCheckbox selected={this.state.feature} onChange={this.checkOption} value="image"/>
							Image Service
						</li>
					</ul>			
				</div>
			</div>);
		}
	});

var NoResutsMessage=React.createClass({
	render:function(){
		return <div className="bs-callout bs-callout-info" id="callout-help-text-accessibility">
					<p>Use input search for finding Arcgis Online Layers and add them to your <code>Map</code></p>
				</div>
	}
});

/*
  Root Element input text + search list
  */
  module.exports  = React.createClass({

  	handleNextPage:function(){
  		if (this.query){
  			this.query.start=this.props.results.nextStart;
  			this.onSearch(this.query,true)
  		}
  	},

  	onSearch:function(val,append){
  		this.query=val;
  		this.props.onSearch(val,append);
  	},

  	componentWillReceiveProps:function(nextProps){
  		
  	},

	componentWillUpdate:function( nextProps, nextState){
  		  	
  	},

  	render: function() {
  		console.log("layers->search->search: Render Layer Search");
  		return (
  			<div>
  			<SearchInput  onSearch={this.onSearch}/>
  			<hr class="h-divider"></hr>
  			{this.props.results && this.props.results.results?
				<Results  
  				onNextPage={this.handleNextPage}
  				results={this.props.results} 
  				onAddLayer={this.props.onAddLayer} 
  				token={this.props.token}  
  				error={this.props.error}/>:<NoResutsMessage/>}
  				
  			</div>
  		);
  	}
  });
