
'use strict';


var React = require('react/addons');
var Router = require('react-router'),Route = Router.Route,  RouteHandler = require('react-router').RouteHandler;
var Reflux = require('reflux');
var Actions=require('../../actions/saveActions.js');

module.exports = React.createClass({

	componentDidMount:function(){
		Actions.openMap(this.props.params.id);
	},

	render: function() {
		return (
		<div>
			{/* defer to the child route handler */}
			<RouteHandler {...this.props}/>
		</div>
		)
	}
});
