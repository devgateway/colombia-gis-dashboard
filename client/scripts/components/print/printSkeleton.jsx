
'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var Actions=require('../../actions/saveActions.js')
var LegendControl = require('./legendPrintControl.jsx');
var Map=require('../map/map.jsx');
var Filters=require('./filters/filtersManager.jsx');

var Grid=require('react-bootstrap/lib/Grid');
var Row=require('react-bootstrap/lib/Row');
var Col=require('react-bootstrap/lib/Col');
var SaveStore=require('../../stores/saveStore.js');
module.exports = React.createClass({

	 mixins: [Reflux.connect(SaveStore,'data')],



	componentDidMount:function(){
		Actions.openMap(this.props.params.id);
	},
	render: function() {
		debugger;
		return (
			<Grid className="pdf">
				<Row>
					<Col lg={12} md={12}>
						<h1>{(this.state.data)?this.state.data.mapName:''}</h1>
					</Col>
				</Row>

				<Row>
					<Col lg={12} md={12}>
						<p>{(this.state.data)?this.state.data.mapDescription:''}</p>
					</Col>
				</Row>
				<Row>
					<Col lg={12} md={12}>
						<div id="map">
							<Map/>
						</div>
					</Col>
				</Row>
				<div className="clearFix"/>
				<div style={{'page-break-before':'always'}}/>
				
				<Row>
					<Col lg={12} md={12}><h1>Map Legends</h1></Col>
				</Row>
				
				<Row>
					<Col lg={12} md={12}>
						<LegendControl/>
					</Col>
				</Row>
				
				<div className="clearFix"/>
				<div style={{'page-break-before':'always'}}/>
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



				