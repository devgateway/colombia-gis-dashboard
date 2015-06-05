/*
 * Leaflet raw map component used by ./map.jsx (use that if you want a map)
 */

 'use strict';
 var React = require('react/addons');
 var Reflux = require('reflux');
 var LegendActions = require('../../../actions/legendActions.js');


module.exports = React.createClass({

	componentDidMount: function () {
		 var self=this;
		  var rgbColor = self.props.color.r + "," + self.props.color.g + "," + self.props.color.b + "," + self.props.color.a;
   
	   
	    $(this.getDOMNode()).colorpicker({
	        'color':'rgba('+rgbColor+')',
	    })
	    .on('changeColor',function(evt){
	    	
	    	self.props.onChangeColor? self.props.onChangeColor(evt.color.toRGB(),self.props.level):null;
	    	LegendActions.changeColorFundingByType(evt.color.toRGB(), self.props.level.split("Level")[1]);
	    });
	     
	},

	render:function(){
				return (<div>
    				
    				<input type="text" style={{'display':'none'}} className="form-control"   value={this.props.color}/>
    				<span className="input-group-addon"><i></i></span>
			</div>)
	}
})
