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
var CheckBox=require('../commons/customCheckbox.jsx');

module.exports = React.createClass({

	mixins: [Reflux.connect(IndicatorsFinderStore)],

	getInitialState:function(){
		return {'showModal': false, 'typesSelected': [], currentPage: 1, 'showLoading': false};
	},

	close:function(){
		this.setState({'showModal': false});
		if (this.props.onClose){
			this.props.onClose();
		}
	},

	open:function(){
		this.setState({'showModal': true});
	},

	_updateType:function(type){
		var typesSelected = _.clone(this.state.typesSelected);
		if (type.selected){
			typesSelected.push(type.value);
		} else {
			typesSelected.splice(typesSelected.indexOf(type.value));
		}
		this.setState({'typesSelected': typesSelected});
		Actions.updateQuery('t',typesSelected);
	},

	_programChanged:function(event){
		var state = _.clone(this.state);
		state.activities = undefined;
		state._activitySelected = undefined;
		this.setState(state);//reset activitySelected
		this.setState({'programSelected': event.target.value, 'showLoading': true});
		Actions.getActivitiesByProgram(event.target.value);
	},

	_activityChanged:function(event){
		this.setState({'_activitySelected': event.target.value});
		Actions.updateQuery('pr',event.target.value);
	},

	_changeKeyword:function(event){
		Actions.updateQuery('k',event.target.value);
	},

	_changeIndicator:function(indicator,event){
		Actions.updateIndicator(indicator, this.state._activitySelected);
		this.close();
	},

	componentDidMount:function(){
		Actions.load();
		if (this.props.visible){
			this.open();
		}
	},

	_handlePagination:function(event,val){
		this.setState({'currentPage': val.eventKey});
		Actions.updateQuery('page',val.eventKey);
		Actions.find();
	},

	_find:function(){
		this.setState({'currentPage': 1, 'showLoading': true});
		Actions.updateQuery('page', 1);//reset page
		Actions.find();
	},

	componentWillReceiveProps :function(nextProps){
		if (nextProps.visible){
			this.open();
		}
	},

	render:function() {
		var totalPages = Math.ceil(this.state.results.count/10);
		console.log('#programs -> '+this.state.programs.length);
		return (
			<div>
				<Button bsStyle='primary' bsSize='large' onClick={this.open}>{this.props.label || 'Open'}</Button>
				<Modal  {...this.props} bsSize='large' className='indicator-search' aria-labelledby='contained-modal-title-lg' show={this.state.showModal} onHide={this.close}>
					<Modal.Header>
					<a className='close-dialog' href='#' onClick={this.close}>
					<i className='fa fa-times-circle-o'></i></a>
						<Modal.Title><i className='fa fa-arrows-h'></i><Message message='layers.selectIndicator'/></Modal.Title>
					</Modal.Header>
					<Modal.Body className='finder'>
					<Grid fluid={true}>
						<Row className='blue-panel'>
							<Col md={2}><span className='title'><Message message='layers.program'/></span></Col>
							<Col md={10}>
								<select className='form-control' value={this.state.programSelected} onChange ={this._programChanged} style={{width:'100%'}}>
									<option><Message message='layers.select'/></option>
									{this.state.programs?_.map(this.state.programs, function(item){
										return (<option value={item.id}>{item.name}</option>)
									}):null}
								</select>
							</Col>
						</Row>
						<Row className='blue-panel'>
							<Col md={2}><span className='title'><Message message='layers.activity'/></span></Col>
							<Col md={10}>
								<select className='form-control' disabled={this.state.activities?'':'disabled'} value={this.state._activitySelected} onChange={this._activityChanged} style={{width:'100%'}}>
									<option><Message message='layers.select'/></option>
									{this.state.activities?_.map(this.state.activities, function(item){
										return (<option value={item.id}>{item.name}</option>)
									}):null}
								</select>
							</Col>
						</Row>
						<Row className='blue-panel'>
							<Col md={2}><span className='title'><Message message='layers.type'/></span></Col>
							<Col md={10}>
								<ul>
								{_.map(this.state.types, function(type){
										return (<li><CheckBox onChange={this._updateType} value={type.id}/> {type.name} </li>)
									}.bind(this))
								}
								</ul>
							</Col>
						</Row>
						<Row className='blue-panel'>
							<Col md={2}><span className='title'><Message message='layers.keyword'/></span></Col>
							<Col md={7}>
								<input type='text' placeholder={i18n.t('layers.keyword')} onChange={this._changeKeyword} style={{width:'100%'}}/>
							</Col>
							<Col md={3}>
								<Button className='btn btn-apply pull-right' disabled={this.state._activitySelected?'':'disabled'} onClick={this._find}><Message message='layers.find'/></Button>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								{this.state.showLoading?
								<div><img className='img-centered' src='images/ajax-loader-small.gif'/></div>
								:null}
							</Col>							
						</Row>
						{
							this.state.showNoResults? <div className='filter-no-results'><br/><Message message='filters.noResults'/></div> : ''
						}
						{this.state.results.indicators.length>0?
							<div className='container-full'>
								<Row>
									<Col md={12}>
									<div className='indicator-table'>
										<Table striped condensed hover>
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
														<td className='description'>{indicator.description}</td>
														<td><Button onClick={this._changeIndicator.bind(null,indicator)} bsStyle='primary' bsSize='xsmall'><Message message='layers.select'/></Button></td>
														</tr>)
												}.bind(this))}
											</tbody>
										</Table>
									</div>
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
					<Button className='pull-right' onClick={this.close}><Message message='layers.close'/></Button>
				</Modal.Footer>
			</Modal>
		</div>
		);
	}
});
