'use strict';

var React = require('react');
var Reflux = require('reflux');
var ArcgisLayerStore=require('../../stores/arcgisLayerStore.jsx');



module.exports  = React.createClass({

	componentWillMount: function () {
    	debugger; 
   	},

	render: function() {
		return (
			<div>
				<p>Current Added Layers</p> 
				{
					this.props.layers.map(
						function(l){
								return (<p>{l.title}</p>);
						})
				}
				
			</div>	
			);
	}
});