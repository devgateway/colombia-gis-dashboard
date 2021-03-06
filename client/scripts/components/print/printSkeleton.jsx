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
		return (
			<Grid className='pdf'>
				<Row>
					<Col lg={12} md={12}>
						<h1>{(this.state.data)?this.state.data.mapName:''}</h1>
					</Col>
				</Row>

				<Row>
					<Col lg={12} md={12}>
						<p className='description'>{(this.state.data)?this.state.data.mapDescription:''}</p>
					</Col>
				</Row>
				<Row>
					<Col lg={12} md={12}>
						<div id='map'>
							<Map/>
						</div>
					</Col>
				</Row>
				<div className='clearFix'/>
				
				<Row>
					<Col lg={12} md={12}><h1><Message message='layers.mapLegends'/></h1></Col>
				</Row>
				
				<Row>
					<Col lg={12} md={12} className='legends'>
						<LegendControl/>
					</Col>
				</Row>
				
				<div className='clearFix'/>
				<Row>
					<Col lg={12} md={12}><h1><Message message='filters.dataFilters'/></h1></Col>
				</Row>

				<Row>
					<Col lg={12} md={12} className='filters'>
						<Filters/>
					</Col>
				</Row>
			</Grid>
		);
	}
});



				