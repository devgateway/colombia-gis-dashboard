'use strict';
var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var ArcgisLayersActions=require('../../../../actions/arcgisLayersActions.js');
var Results=require('./results.jsx');
var _=require('lodash');
var CustomCheckbox = require('../../../commons/customCheckbox.jsx');
var LanStore=require('../../../../stores/lanStore.js');


var SearchInput=React.createClass({

	mixins: [Reflux.connect(LanStore, 'lan')],

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

				<div className="layer-search-wrapper">
					<div className="text-search-wrapper">
						<div className="search-box">
							<button type="submit" className="search-button" onClick={this.handleCLick}>
								<i className="fa fa-search"></i>
							</button>
							<input onKeyPress={this.handleOnkeypress} className="keyword-search" type="text" placeholder={i18n.t("layers.searchLayers")} ref="search_input"/>
						</div>
					</div>
					<div className="layer-search-options">
						<ul>

							<li>
								<CustomCheckbox selected={this.state.feature} onChange={this.checkOption} value="feature"/>
								<Message message="layers.featureService"/>
							</li>
							<li>
								<CustomCheckbox selected={this.state.map} onChange={this.checkOption} value="map"/>
								<Message message="layers.mapService"/>
							</li>
							<li>
								<CustomCheckbox selected={this.state.image} onChange={this.checkOption} value="image"/>
								<Message message="layers.imageService"/>
							</li>
						</ul>			
					</div>
				</div>);

	}
		
});


var NoResutsMessage=React.createClass(
{
	render:function(){
		return <div className="bs-callout bs-callout-info" id="callout-help-text-accessibility">
		<p><Message message="layers.arcgisLegend"/></p>
		</div>
	}
}
);

/*
  Root Element input text + search list
  */



  module.exports  = React.createClass({

  	handleNextPage:function(){
  		if (this.state){
  			var newState=_.assign({},this.state,{'start':this.props.search.nextStart,'append':true});
 			this.setState(newState);
 			this.props.onSearch(newState);
  		}
  	},

  	onSearch:function(val){
  		var newState=_.assign(val,{'append':false});
  		this.setState(newState);
  		this.props.onSearch(newState);
  	},




  	render: function() {
  		
  		console.log("layers->search->search: Render Layer Search");
  		return (
  			<div>
  			<SearchInput  onSearch={this.onSearch}/>
  			<hr className="h-divider"></hr>
  			{this.props.search && this.props.search.results?
  				<Results  
  				onNextPage={this.handleNextPage}
  				search={this.props.search} 
  				onAddLayer={this.props.onAddLayer} 
  				token={this.props.token}  
  				error={this.props.error}/>:<NoResutsMessage/>}
  				
  				</div>
  				);
  	}
  });
