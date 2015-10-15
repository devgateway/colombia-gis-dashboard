'use strict';
var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Input=require('react-bootstrap/lib/Input');
var Button=require('react-bootstrap/lib/Button');
var If=require('../commons/if.jsx');
var Reflux = require('reflux');
var Actions=require('../../actions/saveActions.js');
var CustomRadio = require('../commons/customRadioButton.jsx').Radio;
var CustomRadioGroup = require('../commons/customRadioButton.jsx').RadioGroup;
var Store=require('../../stores/saveStore.js');

var _=require('lodash');

module.exports = React.createClass({

	mixins: [Reflux.connect(Store)],

	_export:function(){
		var activitiesEnabled = this.state.layersVisible.shapes || this.state.layersVisible.points;
		var type = !activitiesEnabled? 'indicators': this.state.type;
		this.setState({'exportDisabled': true});
		if(type=='activities'){
			Actions.exportActivities(this.state.format);
		} else {
			Actions.exportIndicators();
		}
	},

	getInitialState:function(){
		return {'type': 'activities', 'visible': false};
	},

	_exportTypeActivities:function(type){
		this.setState({'type': 'activities'});
	},

	_exportTypeIndicators:function(type){
		this.setState({'type': 'indicators'});
	},

	_onClose:function(){
		this.setState({'visible': false, 'error': ''});
	},

	_open:function(){
		if (this.state.type==='activities' && !(this.state.layersVisible.shapes || this.state.layersVisible.points)){
			this.setState({'type': 'indicators'});
		} else if (this.state.type==='indicators' && !this.state.layersVisible.indicators){
			this.setState({'type': 'activities'});
		}
		this.setState({'visible': true});
	},

	render:function() {
		var indicatorsEnabled = this.state.layersVisible.indicators;
		var activitiesEnabled = this.state.layersVisible.shapes || this.state.layersVisible.points;
		var type = !activitiesEnabled? 'indicators': this.state.type;
		var errorArray = this.state.error && this.state.error.split?this.state.error.split(','):null;
		return (
			<div className='save-map-trigger'>
			<a href="#">
				<i className="fa fa-share-square-o" title={i18n.t('savemap.exportmap')} onClick={this._open}></i>
			</a>
			<Modal animation={false} className='dialog-save-map' {...this.props} bsSize='large' aria-labelledby='contained-modal-title-lg'
			 show={this.state.visible} onHide={this._onClose}>
				<Modal.Header>
					<Modal.Title>
						<i className='fa fa-folder-open'></i><Message message='savemap.exportmap'/>
					</Modal.Title>
					<a className='close-dialog' href='#' onClick={this._onClose}>
					<i className='fa fa-times-circle-o'></i></a>
				</Modal.Header>
				<Modal.Body>
					<div className='blue-panel'>
						<div>
							<CustomRadioGroup>
								{activitiesEnabled?
					              <CustomRadio className='horizontal' name='activities' checked={type=='activities'? true : false}
					              	onClick={this._exportTypeActivities} label='savemap.exportactivities'/>
					            : null}
					            {indicatorsEnabled?
					              <CustomRadio className='horizontal' name='indicators' checked={type=='indicators'? true : false}
					              	onClick={this._exportTypeIndicators} label='savemap.exportindicators'/>
					            : null}
				            </CustomRadioGroup>
				        </div>
						{errorArray?
							<div className='filter-no-results'><br/>
								{
									_.map(errorArray, function(e){
										return (<Message message={e}/>)
									})
								}
							</div>
						: null}
						{this.state.exportDisabled?
							<div><img className='img-centered' src='images/ajax-loader-small.gif'/></div>
						:null}
						<div className='adjacent-buttons'>
							<Button className='btn btn-apply pull-right' disabled={this.state.exportDisabled?'disabled':''} onClick={this._export.bind(this)}>{i18n.t('savemap.exportbutton')}</Button>
							<Button  className='pull-right' onClick={this._onClose.bind(this)}>{i18n.t('savemap.closebutton')}</Button>
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
