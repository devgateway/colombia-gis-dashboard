var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Input=require('react-bootstrap/lib/Input');
var Button=require('react-bootstrap/lib/Button');
var If=require('../commons/if.jsx')
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
		return (<Input ref="tags" className="form-control taginput" type="text" defaultValue={this.props.value} onBlur={this._update} />)
	}

})


module.exports = React.createClass({


	mixins: [Reflux.connect(Store,"store")],

	save:function(){
	//TODO add validations
		var description=this.refs.description.getValue();
		var title=this.refs.title.getValue();
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
		return {title:'', description:''}
	},

	updateTags:function(event){
		_.assign(this.state,{'tags':event});
	},

	getTags:function(event){
		var self = this;
		var tags;
		if(self.state.store.id && self.state.store.showModal){
			var map = _.find(this.state.store.maps, function(l){return l._id==self.state.store.id});
			tags = map.tags;
		}
		return tags;
	},

	componentDidUpdate:function(){
		var self = this;
		if(self.state.store.id && self.state.store.showModal){
			var map = _.find(this.state.store.maps, function(l){return l._id==self.state.store.id});
			self.refs.title.getInputDOMNode().value = map.title;
			self.refs.description.getInputDOMNode().value = map.description;
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
						<i className="fa fa-folder-open"></i><Message message='savemap.savemapdialogtitle'/>
					</Modal.Title>
					<a className="close-dialog" href="#" onClick={this.close}>
					<i className="fa fa-times-circle-o"></i></a>
				</Modal.Header>
				<Modal.Body>

				<div className="blue-panel">
					<Input name="title" ref="title" className="form-control" type="text" placeholder={i18n.t('savemap.savemaptitle')}  maxlength="100" addonAfter='*'/>
					<Input type='textarea' name="description" ref="description" className="form-control" rows="3" placeholder={i18n.t('savemap.savemapdescription')} maxlength="300" addonAfter='*' />
				</div>

					<div className="plain-panel">
					<h4 className="modal-title"><Message message='savemap.savemaptags'/></h4>
					<Tags onUpdate={this.updateTags} value={this.getTags()}/>
					<span> <Message message='savemap.tagshelptext'/></span>
					</div>
					<div className="plain-panel"><Message message='savemap.mandatoryFields'/>
						<If condition={this.state.store.errorMsg} >
							<Message message={this.state.store.errorMsg}/>
						</If>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className="btn btn-apply pull-right" onClick={this.save.bind(this)}>{i18n.t('savemap.savebutton')}</Button>
					<Button  className="pull-right" onClick={this.close.bind(this)}>{i18n.t('savemap.closebutton')}</Button>
				</Modal.Footer>
			</Modal>
			</div>
			);
}
});
