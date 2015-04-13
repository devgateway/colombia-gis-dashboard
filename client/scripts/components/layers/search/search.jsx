'use strict';
var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var Message=require('../../lanMessage.jsx');
var ArcgisLayersActions=require('../../../actions/arcgisLayersActions.js');
var ResultList=require('./resultList.jsx');
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
		<div className="layer-search-wrapper">
			<span className="layer-search-label"><Message message="layers.search"/></span>
			<input className="layer-search" type="text" placeholder="Search layer" ref="search_input"/>

			<button className="btn layer-search" onClick={this.handleCLick}>Search</button>
			{this.props.error&&<div className="label label-warning">{this.props.error}</div>}
			<div>
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
