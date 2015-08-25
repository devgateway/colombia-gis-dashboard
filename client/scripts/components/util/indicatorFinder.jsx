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
	
	mixins: [Reflux.connect(IndicatorsFinderStore)],

	getInitialState:function(){
		return { showModal: false, typesSelected: [], currentPage: 1, "showLoading": false};
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
		state.activities = undefined;
		state.activitySelected = undefined;
		this.setState(state);//reset activitySelected
		this.setState({"programSelected": event.target.value, "showLoading": true});
		Actions.getActivitiesByProgram(event.target.value);
	},

	_activityChanged:function(event){
		this.setState({"activitySelected": event.target.value});
		Actions.updateQuery('pr',event.target.value);
	},

	_changeKeyword:function(event){
		Actions.updateQuery('k',event.target.value);
	},

	_changeIndicator:function(indicator,event){
		Actions.updateIndicator(indicator, this.state.activitySelected);
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
		this.setState({"currentPage": 1, "showLoading": true});
		Actions.updateQuery('page', 1);//reset page
		Actions.find();	
	},

	render:function() {
		var totalPages = Math.ceil(this.state.results.count/10);
		console.log("#programs -> "+this.state.programs.length);
		debugger;
		return (
			<div>
				<Button bsStyle='primary' bsSize='large' onClick={this.open}> {this.props.label || 'Open'}</Button>
				<Modal  {...this.props} bsSize='large' aria-labelledby='contained-modal-title-lg' show={this.state.showModal} onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title><Message message='layers.searchIndicator'/></Modal.Title>
					</Modal.Header>
					<Modal.Body className="finder">
					<Grid fluid={true}>
						<Row>
							<Col md={2}><p className="title"><Message message='layers.program'/></p></Col>
							<Col md={8}>
								<select value={this.state.programSelected} onChange ={this._programChanged} style={{width:'100%'}}>
									<option><Message message='layers.select'/></option>
									{this.state.programs?_.map(this.state.programs, function(item){
										return (<option value={item.code}>{item.description}</option>)
									}):null}
								</select>
							</Col>
						</Row>
						<Row>
							<Col md={2}><p className="title"><Message message='layers.activity'/></p></Col>
							<Col md={8}>
								<select disabled={this.state.activities?"":"disabled"} value={this.state.activitySelected} onChange={this._activityChanged} style={{width:'100%'}}>
									<option><Message message='layers.select'/></option>
									{this.state.activities?_.map(this.state.activities, function(item){
										return (<option value={item.id}>{item.name}</option>)
									}):null}
								</select>
							</Col>
						</Row>
						<Row>
							<Col md={2}><p className="title"><Message message='layers.type'/></p></Col>
							<Col md={10}>
								<ul>
								{_.map(this.state.types, function(type){
										return (<li><CheckBox onChange={this._updateType} value={type.code}/> {type.name} </li>)
									}.bind(this))
								}
								</ul>
							</Col>
						</Row>
						<Row>
							<Col md={2}><p className="title"><Message message='layers.keyword'/></p></Col>
							<Col md={8}>
								<input type="text" onChange={this._changeKeyword} style={{width:'100%'}}/>
							</Col>
						</Row>
						<Row>
							<Col md={4}>
								{this.state.showLoading?
								<div><img src="images/ajax-loader-small.gif"/></div>
								:null}
							</Col>
							<Col md={6}>
								<Button disabled={this.state.activitySelected?"":"disabled"} className="pull-right" bsStyle='primary' bsSize='large' onClick={this._find}><Message message='layers.find'/></Button>
							</Col>
						</Row>
						{this.state.results.indicators.length>0? 
							<div>
								<Row>
									<Col md={12}>
										<Table striped bordered condensed hover>
											<thead>
												<tr>
													<th nowrap>Ref Code</th>
													<th nowrap><Message message='layers.description'/></th>
													<th nowrap></th>
												</tr>
											</thead>
											<tbody>
												{_.map(this.state.results.indicators, function(indicator){
													return (<tr>
														<td>{indicator.refCode}</td>
														<td className="description">{indicator.description}</td>
														<td><Button onClick={this._changeIndicator.bind(null,indicator)} bsStyle='primary' bsSize='xsmall'><Message message='layers.select'/></Button></td>
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
					<Button onClick={this.close}><Message message='layers.close'/></Button>
				</Modal.Footer>
			</Modal>
		</div>
	);}

});