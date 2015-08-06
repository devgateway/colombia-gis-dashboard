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
		if(this.state.store.key=='save'){
			Actions.saveMap(this.state);
		} else if(this.state.store.key=='update') {
			Actions.updateMap(this.state.store.id, this.state);
		}
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
		debugger;
	},

	componentDidUpdate:function(){
		var self = this;
		if(self.state.store.id && self.state.store.showModal){
			var map = _.find(this.state.store.maps, function(l){return l._id==self.state.store.id});
			self.refs.title.getDOMNode().value = map.title;
			self.refs.description.getDOMNode().value = map.description;
		}
		
	},

	render:function() {		
		var showModal=this.state.store.showModal || false;
		return (
			<div className="save-map-trigger">
			<Modal className='dialog-save-map' {...this.props} bsSize='large' aria-labelledby='contained-modal-title-lg'
			 show={showModal} onHide={this.close}>
				<Modal.Header>
					<Modal.Title>
						<i className="fa fa-folder-open"></i><Message message='savemap.savemaplabel'/>
					</Modal.Title>
					<a className="close-dialog" href="#" onClick={this.close}>
					<i className="fa fa-times-circle-o"></i></a>
				</Modal.Header>
				<Modal.Body>

				<div className="blue-panel">
					<input name="title" ref="title"  className="form-control" type="text" placeholder={i18n.t('savemap.savemaptitle')} />
					<textarea name="description" ref="description" className="form-control" rows="3" placeholder={i18n.t('savemap.savemapdescription')}></textarea>
				</div>

					<div className="plain-panel">
					<h4 className="modal-title"><Message message='savemap.savemaptags'/></h4>
					<Tags onUpdate={this.updateTags}/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className="btn btn-apply pull-right" onClick={this.save.bind(this)}>Save changes</Button>
					<Button  className="pull-right" onClick={this.close.bind(this)}>Close</Button>
				</Modal.Footer>
			</Modal>
			</div>
			);
}
});
