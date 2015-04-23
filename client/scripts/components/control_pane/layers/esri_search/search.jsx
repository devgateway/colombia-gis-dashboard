'use strict';
var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var ArcgisLayersActions=require('../../../../actions/arcgisLayersActions.js');
var Results=require('./results.jsx');
var _=require('lodash');

/*The button to add the layer to the map*/



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

	checkOption:function(evnt){
		var newState={};
		newState[evnt.target.value]=evnt.target.checked;
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
							<span className="select">
								<input className="glyphicon glyphicon-stop" type="checkbox" value="feature" onClick={this.checkOption} checked={this.state.feature}/>
							</span>
								Feature Service
						</li>
						<li>
							<span className="select">
							<input className="glyphicon glyphicon-stop" type="checkbox" value="map" onClick={this.checkOption} checked={this.state.map}/>
							</span>
								Map Service
						</li>
						<li>
						<span className="select">
							<input className="glyphicon glyphicon-stop" type="checkbox" value="image" onClick={this.checkOption} checked={this.state.image}/>
						</span>
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
  		debugger;
  	},

	componentWillUpdate:function( nextProps, nextState){
  		debugger;  	
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
