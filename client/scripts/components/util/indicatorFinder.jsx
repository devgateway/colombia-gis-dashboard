'use strict';
var _ = require('lodash');
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
		return { showModal: false, typesSelected: [], currentPage: 1};
	},

	close:function(){
		this.setState({ showModal: false });
	},

	open:function(){
		this.setState({ showModal: true });
	},

	_updateType:function(type){
		var typesSelected = _.clone(this.state.typesSelected);
		if(type.selected){
			typesSelected.push(type.value);
		}else{
			typesSelected.splice(typesSelected.indexOf(type.value));
		}
		this.setState({"typesSelected": typesSelected});
		Actions.updateQuery('t',typesSelected);
	},

	_programChanged:function(event){
		var state = _.clone(this.state);
		state.store.activities = undefined;
		state.activitySelected = undefined;
		this.setState(state);//reset activitySelected
		Actions.getActivitiesByProgram(event.target.value);
	},

	_activityChanged:function(event){
		this.setState({"activitySelected": event.target.value});
		Actions.updateQuery('pr',event.target.value);
	},

	_changeKeyword:function(event){
		Actions.updateQuery('k',event.target.value);
	},

	_changeIndicator:function(id,event){
		Actions.updateIndicator(id, this.state.activitySelected);
		this.close();
	},

	componentDidMount:function(){
		Actions.load();
	},

	_handlePagination:function(event,val){
		this.setState({"currentPage": val.eventKey});
		Actions.updateQuery('page',val.eventKey);
		Actions.find();
	},

	_find:function(){
		this.setState({"currentPage": 1});
		Actions.updateQuery('page', 1);//reset page
		Actions.find();	
	},

	render:function() {
		var totalPages = Math.ceil(this.state.store.results.count/10);
		console.log("#programs -> "+this.state.store.programs.length);
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
									{this.state.store.programs?_.map(this.state.store.programs, function(item){
										return (<option value={item.code}>{item.description}</option>)
									}):null}
								</select>
							</Col>
						</Row>
						<Row>
							<Col md={2}><p className="title">Activity</p></Col>
							<Col md={8}>
								<select onChange ={this._activityChanged} style={{width:'100%'}}>
									<option>Select Activity</option>
									{this.state.store.activities?_.map(this.state.store.activities, function(item){
										return (<option value={item.id}>{item.name}</option>)
									}):null}
								</select>
							</Col>
						</Row>
						<Row>
							<Col md={2}><p className="title">Type</p></Col>
							<Col md={10}>
								<ul>
								{_.map(this.state.store.types, function(type){
										return (<li><CheckBox onChange={this._updateType} value={type.code}/> {type.name} </li>)
									}.bind(this))
								}
								</ul>
							</Col>
						</Row>
						<Row>
							<Col md={2}><p className="title">Keyword</p></Col>
							<Col md={8}>
								<input type="text" onChange={this._changeKeyword} style={{width:'100%'}}/>
							</Col>
						</Row>
						<Row>
							<Col md={6} xsOffset={4}>
								<Button disabled={this.state.activitySelected?"":"disabled"} className="pull-right" bsStyle='primary' bsSize='large' onClick={this._find}>Find</Button>
							</Col>
						</Row>
						{this.state.store.results.indicators.length>0? 
							<div>
								<Row>
									<Col md={12}>
										<Table striped bordered condensed hover>
											<thead>
												<tr>
													<th nowrap>Ref Code</th>
													<th nowrap>Description</th>
													<th nowrap></th>
												</tr>
											</thead>
											<tbody>
												{_.map(this.state.store.results.indicators, function(indicator){
													return (<tr>
														<td>{indicator.refCode}</td>
														<td className="description">{indicator.description}</td>
														<td><Button onClick={this._changeIndicator.bind(null,indicator.id)} bsStyle='primary' bsSize='xsmall'><span>Select</span> </Button></td>
														</tr>)
												}.bind(this))}
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
											items={totalPages}
											maxButtons={totalPages<5? 0 : 5}
											activePage={this.state.currentPage}
											onSelect={this._handlePagination} />
									</Col>
								</Row>
							</div>
							: null							
						}
						
					</Grid>			
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.close}>Close</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);}

});