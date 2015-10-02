'use strict';
var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Input=require('react-bootstrap/lib/Input');
var Button=require('react-bootstrap/lib/Button');
var If=require('../commons/if.jsx');
var Reflux = require('reflux');
var Actions=require('../../actions/saveActions.js');
var CheckBox=require('../commons/customCheckbox.jsx')
var Store=require('../../stores/saveStore.js');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');

var _=require('lodash');

var Tags= React.createClass({
	_update:function(event){
		this.props.onUpdate(event.target.value);
	},

	render:function() {
		return (
			<Input ref='tags'
			className='form-control taginput'
			type='text' maxLength='80'
			defaultValue={this.props.value} onBlur={this._update} />
		);
	}
});


module.exports = React.createClass({

	mixins: [Reflux.connect(Store)],

	save:function(){
		//this._onClose();
		if(!this.state.saveAs && this.state.currentMap && this.state.currentMap._id){
			Actions.updateMap(this.state.currentMap._id, this.state.currentMap);
		} else {
			Actions.saveMap(this.state.currentMap);
		}
	},

	getInitialState:function(){
		return {'title':'', 'description':'', 'visible':false};
	},

	_updateTags:function(tags){
		var map = _.clone(this.state.currentMap);
		map.tags = tags;
		this.setState({'currentMap':map});
	},

	_updateTitle:function(event){
		var map = _.clone(this.state.currentMap);
		map.title = event.target.value;
		this.setState({'currentMap':map});
	},

	_updateDescription:function(event){
		var map = _.clone(this.state.currentMap);
		map.description = event.target.value;
		this.setState({'currentMap':map});
	},

	_onClose:function(){
		this.setState({'visible':false, 'errorMsg': ''});
	},

	_openSave:function(){
		this.setState({'visible':true, 'saveAs': false});
	},

	_openSaveAs:function(){
		this.setState({'visible':true, 'saveAs': true, 'currentMap':{}});
	},

	render:function() {
		var errorArray = this.state.errorMsg?this.state.errorMsg.split(','):null;
		var saveButtonLabel = this.state.saveAs? 'savemap.saveasnewbutton' : 'savemap.savebutton';
		return (
			<div className='save-map-trigger'>
			<a href="#">
				<i className="fa fa-floppy-o" title={i18n.t('savemap.tooltipsaveasnewmap')} onClick={this._openSaveAs}></i>
			</a>
			{this.state.currentMap._id?
				<a href="#">
					<i className="fa fa-pencil-square-o" title={i18n.t('savemap.tooltipsavemap')} onClick={this._openSave}></i>
				</a>
			: null}
			<Modal animation={false} className='dialog-save-map' {...this.props} bsSize='large' aria-labelledby='contained-modal-title-lg'
			 show={this.state.visible} onHide={this._onClose}>
				<Modal.Header>
					<Modal.Title>
						<i className='fa fa-folder-open'></i><Message message='savemap.savemapdialogtitle'/>
					</Modal.Title>
					<a className='close-dialog' href='#' onClick={this._onClose}>
					<i className='fa fa-times-circle-o'></i></a>
				</Modal.Header>
				<Modal.Body>
					<div className='blue-panel'>
						<div>
							<Input name='title'
								type='text'
								className='form-control title'
								onChange={this._updateTitle}
								placeholder={i18n.t('savemap.savemaptitle')}
								value={this.state.currentMap.title} maxLength='100' addonAfter='*'/>
							<Input type='textarea' name='description'
								onChange={this._updateDescription}
								className='form-control description'
								rows='3'
								placeholder={i18n.t('savemap.savemapdescription')}
								value={this.state.currentMap.description} maxLength='300' addonAfter='*' />
						</div>

						<div>
							<h4 className='modal-title'><Message message='savemap.savemaptags'/></h4>
							<Tags onUpdate={this._updateTags} value={this.state.saveAs? '' : this.state.currentMap.tags}/>
						</div>
						<div className='required'><Message message='savemap.mandatoryFields'/>
							{
								_.map(errorArray, function(e){
									return (<Message message={e}/>)
								})
							}
						</div>

						<div className='adjacent-buttons'>
							<Button className='btn btn-apply pull-right' onClick={this.save}>{i18n.t(saveButtonLabel)}</Button>
							<Button  className='pull-right' onClick={this._onClose}>{i18n.t('savemap.closebutton')}</Button>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
				</Modal.Footer>
			</Modal>
			</div>
		);
	}
});
