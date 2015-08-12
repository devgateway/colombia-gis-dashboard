	var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Button=require('react-bootstrap/lib/Button');

var IndicatorsFinderStore=require('../../stores/indicatorsFinderStore.js');
var Reflux = require('reflux');
var Actions=require('../../actions/saveActions.js');
var CheckBox=require('../commons/customCheckbox.jsx')
var Store=require('../../stores/saveStore.js');

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


	mixins: [Reflux.connect(Store,"store")],

	save:function(){
	//TODO add validations
		var description=this.refs.description.getDOMNode().value;
		var title=this.refs.title.getDOMNode().value;
		_.assign(this.state,{'title':title,'description':description});

		Actions.saveMap(this.state);
	},

	close:function(){
		Actions.hideModal();
	},

	open:function(){
		Actions.showModal()
	},

	getInitialState:function(){
		return {title:'',description:'',tags:''}
	},
	
	updateTags:function(event){
		
	},
	
	render:function() {
		var showModal=this.state.store.showModal || false;
		return (
			<span>
			<a href="#" data-toggle="modal" data-target="#myModal" onClick={this.open}>Save</a>
			<Modal className='dialog-save-map' {...this.props} bsSize='large' aria-labelledby='contained-modal-title-lg'
			 show={showModal} onHide={this.close}>
				<Modal.Header>
					<Modal.Title>
						<i className="fa fa-folder-open"></i> <Message message='savemap.savemaplabel'/> 
						<a class="" style={{'float':'right', 'margin-top':'0px'}} href="#" onClick={this.close}>
						<i className="fa fa-times-circle-o"></i></a>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input name="title" ref="title"  className="form-control" type="text" placeholder={i18n.t('savemap.savemaptitle')}/>
					<textarea name="description" ref="description" className="form-control" rows="3" placeholder={i18n.t('savemap.savemapdescription')}></textarea>
					<div className="panel-body-savemap plain">
					<h3><Message message='savemap.savemaptags'/></h3>
					<Tags onUpdate={this.updateTags}/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle='primary' className="pull-right" onClick={this.save.bind(this)}>Save changes</Button>
					<span className="pull-right">|</span> 
					<Button  className="pull-right" onClick={this.close.bind(this)}>Close</Button> 
				</Modal.Footer>
			</Modal>
			</span>
			);
}
});