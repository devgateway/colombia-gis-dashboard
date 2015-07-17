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
		Actions.updateQuery('t',type);
	},

	_programChanged:function(event){
		Actions.updateQuery('pr',event.target.value);
	},

	_changeKeyword:function(event){
		Actions.updateQuery('k',event.target.value);
	},

	_changeIndicator:function(id,event){
		Actions.updateIndicator(id);
	},

	componentDidMount:function(){
		Actions.load();
	},

	_handlePagination:function(event,val){
		Actions.updateQuery('page',val.eventKey);
	},

	_find:function(){

		Actions.find();	
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
			{this.state.store.programs?this.state.store.programs.map(function(item){
				return (<option value={item.code}>{item.description}</option>)
			}):null}
			</select>
			</Col>

			</Row>
			<Row>
			<Col md={2}><p className="title">Type</p></Col>
			<Col md={10}>
			<ul>
			{
				this.state.store.types.map(function(type){
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
			<Col md={6} xsOffset={4} >
			<Button className="pull-right" bsStyle='primary' bsSize='large' onClick={this._find}>Find</Button>

			</Col>


			</Row>



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
			{

				this.state.store.results.indicators.map(function(indicator){
					return (<tr>
						<td>{indicator.refCode}</td>
						<td className="description">{indicator.description}</td>
						<td><Button onClick={this._changeIndicator.bind(null,indicator.id)} bsStyle='primary' bsSize='xsmall'><span>Select</span> </Button></td>
						</tr>)
				}.bind(this))

			}

			</tbody>
			</Table>
			</Col>
			</Row>
			<Row>
			<Col md={8} 
			xsOffset={3}>
			<Pagination
			prev={true}
			next={true}
			first={true}
			last={true}
			ellipsis={true}
			items={20}
			maxButtons={3}
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