
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var Actions=require('../../actions/saveActions.js')
var LegendControl = require('./legendPrintControl.jsx');
var Map=require('../map/map.jsx');
var Filters=require('./filtersPrintControl.jsx');

var Grid=require('react-bootstrap/lib/Grid');
var Row=require('react-bootstrap/lib/Row');
var Col=require('react-bootstrap/lib/Col');

module.exports = React.createClass({

	
	render: function() {
		return (
			<Grid className="pdf">
				<Row>
					<Col lg={12} md={12}>
						<h1>Map title</h1>
					</Col>
				</Row>

					<Row>
					<Col lg={12} md={12}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim ligula non blandit dapibus. Donec eu odio facilisis, lacinia nisl et, sagittis mi. Morbi ornare suscipit luctus. Ut in fermentum nisi. 
						<br/> Donec sed turpis tincidunt, gravida dolor laoreet, ullamcorper nisl. Mauris sagittis purus id hendrerit vehicula. 
						<br/> Duis pulvinar velit eget sagittis euismod. Integer consequat mi ac tincidunt scelerisque. Praesent viverra, diam nec congue ullamcorper, libero elit venenatis mauris, et fringilla arcu neque sit amet neque.</p>
					</Col>
				</Row>
				<Row>
					<Col lg={12} md={12}>
						<div id="map">
							<Map/>
							<div style={{'page-break-before':'always'}}/>
						</div>
					</Col>
				</Row>
				
				<Row>
					<Col lg={12} md={12}><h1>Map Legends</h1></Col>
				</Row>
				<Row>
					<Col lg={12} md={12}>
						<LegendControl/>
					</Col>
				</Row>
				
				<Row>
					<Col lg={12} md={12}><h1>Data filters</h1></Col>
				</Row>
				<Row>
					<Col lg={12} md={12}>
						<Filters/>
					</Col>
				</Row>

				
				
	
			</Grid>
			)
	}
});



				