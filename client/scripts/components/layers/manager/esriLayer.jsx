'use strict';

var React = require('react');
var Reflux = require('reflux');

module.exports=React.createClass({

	componentWillReceiveProps:function(){
		console.log('layer componentWillReceiveProps');
	},

	update:function(){
		this.props.layer.defaultVisibility=!this.props.layer.defaultVisibility;
	    this.props.onChange();
		this.forceUpdate();
	},

	

	render: function() {
		
		/*use this.props.layer */
		console.log("layer -> render");

		return (<li>
			
			<input name={this.props.layer.id}  checked={this.props.layer.defaultVisibility} onChange={this.update}  type="checkbox"/> 
		      	{this.props.layer.name} 
		     </li>)
	}
});