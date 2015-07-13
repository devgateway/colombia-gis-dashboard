var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Button=require('react-bootstrap/lib/Button');
var OverlayTrigger=require('react-bootstrap/lib/OverlayTrigger');
var Popover=require('react-bootstrap/lib/Popover');
var Tooltip=require('react-bootstrap/lib/Tooltip');
var ProgramStore=require('../../stores/programsStore.js');
var Reflux = require('reflux');
var Actions=require('../../actions/programsActions.js');

module.exports = React.createClass({
	
	mixins: [Reflux.connect(ProgramStore,"programs")],

	getInitialState:function(){
		return { showModal: false};
	},

	close:function(){
		this.setState({ showModal: false });
	},

	open:function(){
		this.setState({ showModal: true });
	},

	_programChanged:function(){
		debugger;
	

	},

	componentDidMount:function(){
		Actions.load();
	},

	render:function() {
		debugger;

		var popover = <Popover title='popover'>very popover. such engagement</Popover>;
		var tooltip = <Tooltip>wow.</Tooltip>;

		return (
			<div>

			<Button bsStyle='primary' bsSize='large' onClick={this.open}> {this.props.label || 'Open'}</Button>
			
			<Modal show={this.state.showModal} onHide={this.close}>
			
				<Modal.Header closeButton>
					<Modal.Title>Indicator Search</Modal.Title>
				</Modal.Header>
			<Modal.Body>
				<h4>Search indicators</h4>
				<p>Program</p>
			
				<select onChange ={this._programChanged}>
					<option>Select Program</option>
					{this.state.programs.programsList?this.state.programs.programsList.map(function(item){
					 return (<option>{item.description}</option>)
					}):null}
				</select>


						
			</Modal.Body>
			<Modal.Footer>

			<Button onClick={this.close}>Close</Button>
			</Modal.Footer>
			</Modal>
			</div>
			);
}
});