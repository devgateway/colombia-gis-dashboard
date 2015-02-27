'use strict';

var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var LayersActions=require('../../actions/layersAction.js')
var LayersStore=require('../../stores/layersStore.jsx')
module.exports  = React.createClass({

    mixins: [Reflux.connect(LayersStore, 'layers')],

	searchLayers:function(){
		console.log('Search layers');
		var val = this.refs.search_input.getDOMNode().value;
		LayersActions.searchOnArgGis({query:val});
	},

	render: function() {
		console.log('Render Layer Manager')
		return (  
			<div>
				<p>Search  Layers on  ArcGis Online</p>
				<input type="text" placeholder="Search layer"  ref="search_input">
					<button onClick={this.searchLayers}>GO</button>
				</input>
			</div>
			);


	}

});