/*
 * Leaflet raw map component used by ./map.jsx (use that if you want a map)
 */

 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');


module.exports = React.createClass({

	componentDidMount: function () {
	    var self=this;
	    $(this.getDOMNode()).colorpicker({
	        'color':self.props.color,
	    }).on('changeColor',function(){
	    	self.props.onChangeColor?self.props.onChangeColor():null});
	     
	},

	render:function(){
				return (<span>
    				<input type="text" style={{'display':'none'}} className="form-control"   value={this.props.color}/>
    				{this.props.label}
    				<span className="input-group-addon"><i></i></span>
			</span>)
	}
})
