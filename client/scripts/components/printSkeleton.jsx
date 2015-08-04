
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Map=require('./map/map.jsx');
var SlideBar=require('./commons/slideBar.jsx');
var TabNavigator=require('./control_pane/tabNavigator.jsx');
var Actions=require('../actions/saveActions.js')
var Header=require('./header.jsx');

var Footer=require('./footer.jsx');



module.exports = React.createClass({

	
	render: function() {
		return (
			<div style={{margin:'20pt'}}>
			
				<h3>Map title</h3>

				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim ligula non blandit dapibus. Donec eu odio facilisis, lacinia nisl et, sagittis mi. Morbi ornare suscipit luctus. Ut in fermentum nisi. 
				<br/> Donec sed turpis tincidunt, gravida dolor laoreet, ullamcorper nisl. Mauris sagittis purus id hendrerit vehicula. 
				<br/> Duis pulvinar velit eget sagittis euismod. Integer consequat mi ac tincidunt scelerisque. Praesent viverra, diam nec congue ullamcorper, libero elit venenatis mauris, et fringilla arcu neque sit amet neque.</p>
				
				<div id="map-image">
					<img src='image.jpg'/>				
					</div>
				<div style={{'margin-top':'25px','padding-top':'2px;','border':'0px'}}>
					<Footer/>
				</div>
			</div>
			)
	}
});
