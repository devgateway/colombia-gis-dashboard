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
		if(!this.state.saveAs && this.state.currentMap && this.state.currentMap.id){
			Actions.updateMap(this.state.currentMap.id, this.state.currentMap);
		} else {
			Actions.saveMap(this.state.newMap);
		}
	},

	getInitialState:function(){
		return {'title':'', 'description':'', 'saveVisible':false};
	},

	_updateTags:function(tags){
		if (this.state.saveAs){
			var map = _.clone(this.state.newMap);
			map.tags = tags;
			this.setState({'newMap':map});
		} else {
			var map = _.clone(this.state.currentMap);
			map.tags = tags;
			this.setState({'currentMap':map});
		}
	},

	_updateTitle:function(event){
		if (this.state.saveAs){
			var map = _.clone(this.state.newMap);
			map.title = event.target.value;
			this.setState({'newMap':map});
		} else {
			var map = _.clone(this.state.currentMap);
			map.title = event.target.value;
			this.setState({'currentMap':map});
		}		
	},

	_updateDescription:function(event){
		if (this.state.saveAs){
			var map = _.clone(this.state.newMap);
			map.description = event.target.value;
			this.setState({'newMap':map});
		} else {
			var map = _.clone(this.state.currentMap);
			map.description = event.target.value;
			this.setState({'currentMap':map});
		}	
	},

	_onClose:function(){
		this.setState({'saveVisible':false, 'errorMsg': ''});
	},

	_openSave:function(){
		this.setState({'saveVisible':true, 'saveAs': false});
	},

	_openSaveAs:function(){
		this.setState({
			'saveVisible':true, 
			'saveAs': true, 
			'newMap':{'title':'', 'description':'', 'tags':''}});
	},

	render:function() {
		var errorArray = this.state.errorMsg?this.state.errorMsg.split(','):null;
		var saveLabel = this.state.saveAs? i18n.t('savemap.saveasnewbutton') : i18n.t('savemap.savebutton');
		var map = this.state.saveAs? this.state.newMap : this.state.currentMap;
		return (
			<div className='save-map-trigger'>
			<a href="#">
				<i className="fa fa-floppy-o" title={saveLabel} onClick={this._openSaveAs}></i>
			</a> 
			{this.state.currentMap.id?
				<a href="#">
					<i className="fa fa-pencil-square-o" title={i18n.t('savemap.tooltipsavemap')} onClick={this._openSave}></i>
				</a>
			: null}
			<Modal animation={false} className='dialog-save-map' {...this.props} bsSize='large' aria-labelledby='contained-modal-title-lg'
			 show={this.state.saveVisible} onHide={this._onClose}>
				<Modal.Header>
					<Modal.Title>
						<i className='fa fa-folder-open'></i>{saveLabel}
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
								value={map.title} maxLength='100' addonAfter='*'/>
							<Input type='textarea' name='description'
								onChange={this._updateDescription}
								className='form-control description'
								rows='3'
								placeholder={i18n.t('savemap.savemapdescription')}
								value={map.description} maxLength='300' addonAfter='*' />
						</div>

						<div>
							<h4 className='modal-title'><Message message='savemap.savemaptags'/></h4>
							<Tags onUpdate={this._updateTags} value={map.tags}/>
						</div>
						<div className='required'><Message message='savemap.mandatoryFields'/>
							{
								_.map(errorArray, function(e){
									return (<Message message={e}/>)
								})
							}
						</div>

						<div className='adjacent-buttons'>
							<Button className='btn btn-apply pull-right' onClick={this.save}>{saveLabel}</Button>
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
