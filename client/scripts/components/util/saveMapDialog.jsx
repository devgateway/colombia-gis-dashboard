var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Button=require('react-bootstrap/lib/Button');
var OverlayTrigger=require('react-bootstrap/lib/OverlayTrigger');
var Popover=require('react-bootstrap/lib/Popover');

var Grid=require('react-bootstrap/lib/Grid');
var Row=require('react-bootstrap/lib/Row');
var Col=require('react-bootstrap/lib/Col');
var Table=require('react-bootstrap/lib/Table');
var Tooltip=require('react-bootstrap/lib/Tooltip');
var IndicatorsFinderStore=require('../../stores/indicatorsFinderStore.js');
var Reflux = require('reflux');
var Actions=require('../../actions/saveActions.js');
var CheckBox=require('../commons/customCheckbox.jsx')

var _=require('lodash');

var Tags= React.createClass({
	_update:function(event){
		this.props.onUpdate(event.target.value);
	},

	render:function() {
		return (<input className="form-control taginput" type="text" defaultValue={this.props.value} onBlur={this._update} />)
	}
	
})


module.exports = React.createClass({

	save:function(){
		//TODO add validations
			Actions.saveMap();
	},

	close:function(){
		this.setState({ showModal: false });
	},

	open:function(){
		this.setState({ showModal: true });
	},

	getInitialState:function(){
		return { showModal: false, tags:[{'value':''}]};
	},

	updateTags:function(event){
		debugger;
	},
	
	render:function() {
		return (
				 <span>
					<a href="#" data-toggle="modal" data-target="#myModal" onClick={this.open}>Save</a>
					 <Modal className='dialog-save-map' {...this.props} bsSize='large' aria-labelledby='contained-modal-title-lg' show={this.state.showModal} onHide={this.close}>
						<Modal.Header>
							<Modal.Title>
							  <i className="fa fa-folder-open"></i> <Message message='savemap.savemaplabel'/> 
							  	<a class="" style={{'float':'right', 'margin-top':'0px'}} href="#" onClick={this.close}>
							  		<i className="fa fa-times-circle-o"></i>
							  	</a>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<input className="form-control" type="text" placeholder={i18n.t('savemap.savemaptitle')}/>
							<textarea className="form-control" rows="3" placeholder={i18n.t('savemap.savemapdescription')}></textarea>
							<div className="panel-body-savemap plain">
								<h3><Message message='savemap.savemaptags'/></h3>
								<Tags onUpdate={this.updateTags}/>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button bsStyle='primary' className="pull-right" onClick={this.save}>Save changes</Button>
							<span className="pull-right">|</span> 
							<Button  className="pull-right" onClick={this.close}>Close</Button> 
						</Modal.Footer>
					</Modal>
				 </span>
			 );
	}
});