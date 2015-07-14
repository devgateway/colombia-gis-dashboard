var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Button=require('react-bootstrap/lib/Button');
var OverlayTrigger=require('react-bootstrap/lib/OverlayTrigger');
var Popover=require('react-bootstrap/lib/Popover');

var Grid=require('react-bootstrap/lib/Grid');
var Row=require('react-bootstrap/lib/Row');
var Col=require('react-bootstrap/lib/Col');
var Table=require('react-bootstrap/lib/Table');
var Pagination=require('react-bootstrap/lib/Pagination');

var Tooltip=require('react-bootstrap/lib/Tooltip');
var IndicatorsFinderStore=require('../../stores/indicatorsFinderStore.js');
var Reflux = require('reflux');
var Actions=require('../../actions/indicatorFinderActions.js');
var CheckBox=require('../commons/customCheckbox.jsx')

module.exports = React.createClass({
	
	mixins: [Reflux.connect(IndicatorsFinderStore,"store")],

	getInitialState:function(){
		return { showModal: false};
	},

	close:function(){
		this.setState({ showModal: false });
	},

	open:function(){
		this.setState({ showModal: true });
	},

	_updateType:function(type){
		Actions.typeClick(type)
	},

	componentDidMount:function(){
		Actions.load();
	},

	_handlePagination:function(){

	},

	render:function() {
		//var popover = <Popover title='popover'>very popover. such engagement</Popover>;
		//var tooltip = <Tooltip>wow.</Tooltip>;
		return (
					<div>
						<Button bsStyle='primary' bsSize='large' onClick={this.open}> {this.props.label || 'Open'}</Button>
						<Modal  {...this.props} bsSize='large' aria-labelledby='contained-modal-title-lg' show={this.state.showModal} onHide={this.close}>
							<Modal.Header closeButton>
							<Modal.Title>Search Indicator</Modal.Title>
						</Modal.Header>
						<Modal.Body className="finder">
						<Grid fluid={true}>
										<Row>
											<Col md={2}><p className="title">Program</p></Col>
											<Col md={8}>
												<select onChange ={this._programChanged} style={{width:'100%'}}>
													<option>Select Program</option>
													{this.state.store.programsList?this.state.store.programsList.map(function(item){
													return (<option>{item.description}</option>)
												}):null}
											</select>
										</Col>
									</Row>
									<Row>
										<Col md={2}><p className="title">Type</p></Col>
										<Col md={10}>
											<ul>
												<li><CheckBox onChange={this._updateType} value='Outcome'/> Outcome </li>
												<li><CheckBox onChange={this._updateType} value='Impact'/> Impact </li>
												<li><CheckBox onChange={this._updateType} value='Output'/> Output </li>
											</ul>
										</Col>
									</Row>
									<Row>
										<Col md={6} xsOffset={4} >
												<Button className="pull-right" bsStyle='primary' bsSize='large'>Find</Button>
											
										</Col>
										
										
									</Row>
									
									<Row>
										<Col md={12}>

											<Table striped bordered condensed hover>
												<thead>
													<tr>
														<th>#</th>
														<th nowrap>Ref Code</th>
														<th nowrap>IR Code</th>
														<th nowrap>Description</th>
														<th nowrap></th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>447</td>
														<td>CF-9</td>
														<td>IR N.A.3.1</td>
														<td className="description">Número de asociaciones de productores fortalecidos</td>
														<td><Button  bsStyle='primary' bsSize='xsmall'><span>Select</span> </Button></td>
													</tr>
													<tr>
														<td>448</td>
														<td>CF-10</td>
														<td>IR N.A.3.1</td>
														<td className="description">Hectáreas de cultivos alternativos cosechados apoyados por programas del USG (F 1.4.2)</td>
														<td><Button  bsStyle='primary' bsSize='xsmall'><span>Select</span> </Button></td>

													</tr>
													<tr>
														<td>447</td>
														<td>CF-9</td>
														<td>IR N.A.3.1</td>
														<td className="description">Número de asociaciones de productores fortalecidos</td>
														<td><Button  bsStyle='primary' bsSize='xsmall'><span>Select</span> </Button></td>

													</tr>
													<tr>
														<td>448</td>
														<td>CF-10</td>
														<td>IR N.A.3.1</td>
														<td className="description">Hectáreas de cultivos alternativos cosechados apoyados por programas del USG (F 1.4.2)</td>
														<td><Button  bsStyle='primary' bsSize='xsmall'><span>Select</span> </Button></td>

													</tr>
													<tr>
														<td>447</td>
														<td>CF-9</td>
														<td>IR N.A.3.1</td>
														<td className="description">Número de asociaciones de productores fortalecidos</td>
														<td><Button  bsStyle='primary' bsSize='xsmall'><span>Select</span> </Button></td>

													</tr>
													<tr>
														<td>448</td>
														<td>CF-10</td>
														<td>IR N.A.3.1</td>
														<td className="description">Hectáreas de cultivos alternativos cosechados apoyados por programas del USG (F 1.4.2)</td>
														<td><Button  bsStyle='primary' bsSize='xsmall'><span>Select</span> </Button></td>

													</tr>
												</tbody>
											</Table>
										</Col>
										</Row>
										<Row>
											<Col md={8} xsOffset={3}>
												<Pagination
												prev={true}
												next={true}
												first={true}
												last={true}
												ellipsis={true}
												items={20}
												maxButtons={5}
												activePage={1}
												onSelect={this._handlePagination} />
											</Col>

										</Row>
									</Grid>			
						</Modal.Body>
						<Modal.Footer>
								<Button onClick={this.close}>Close</Button>
						</Modal.Footer>
						</Modal>
					</div>

			);
	}

});