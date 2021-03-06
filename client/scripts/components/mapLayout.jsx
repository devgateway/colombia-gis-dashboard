'use strict';
var React = require('react/addons');
var Router = require('react-router'),Route = Router.Route,  RouteHandler = require('react-router').RouteHandler;
var Header=require('./header.jsx');
var Footer=require('./footer.jsx');
var actions=require('../actions/layersAction.js');

module.exports = React.createClass({

	componentDidMount:function(){
		actions.layerInit();
	},

	render: function() {
		return (
			<div>
				<Header/>
				<div id="map-container">
					{/* defer to the child route handler */}
					<RouteHandler {...this.props}/>
				</div>
				<Footer/>
			</div>
		);
	}
});
