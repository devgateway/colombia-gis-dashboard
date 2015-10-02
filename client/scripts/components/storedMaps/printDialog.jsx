'use strict';
var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Button=require('react-bootstrap/lib/Button');
var Reflux = require('reflux');
var Actions=require('../../actions/saveActions.js');
var CheckBox=require('../commons/customCheckbox.jsx');
var API=require('../../api/saveAndRestore.js');
var _=require('lodash');
var tim = require('tinytim').tim;
var Loading=require('../commons/loading.jsx');
var LanStore=require('../../stores/lanStore.js');


module.exports = React.createClass({

	mixins: [Reflux.connect(LanStore, 'lan')],

	_close:function(){
		this.setState({'visible':false});
	},

	_open:function(){
		this.setState({'visible':true, 'file':null});
		this.forceUpdate();
		this._initDownload();
	},

	getInitialState:function(){
		return {'visible':false, 'file':null}; 
	},

	_initDownload:function(){
		API.pdf(this.props.id).then(function(data){
			this.setState({'visible':true, 'file':data.name});
			this.forceUpdate();
		}.bind(this));
	},

	render:function() {
		var downloadMessage=(
			<p className="bs-callout bs-callout-success">
				<a href={tim(window.MAP_DOWNLOAD_URL,{'name':this.state.file||null})}><Message message="savemap.printreadymessage"/></a>
			</p>
			);
		var waitMessage=(
			<p className="bs-callout bs-callout-warning">
				<img src="images/ajax-loader.gif" width="20" height= "20"/>
				<Message message='savemap.printloadmessage'/>
			</p>
			);
		if (!this.props.id){
			return null;
		}
		return (
			<span>
				<a href="#">
					<i className="fa fa-file-pdf-o" title={i18n.t('savemap.tooltipprint')} onClick={this.props.id? this._open : null}></i>
				</a>
				<Modal className='dialog-print-map' bsSize='large' aria-labelledby='contained-modal-title-lg' show={this.state.visible} onHide={this.close}>
					<Modal.Header>
						<Modal.Title>
							<i className="fa fa-folder-open"></i> <Message message='savemap.downloadtitle'/>
						</Modal.Title>
						<a className="close-dialog" href="#" onClick={this._close}>
							<i className="fa fa-times-circle-o"></i>
						</a>
					</Modal.Header>
					<Modal.Body>
						{(this.state.file!=null)?downloadMessage:waitMessage}
					</Modal.Body>
				</Modal>
			</span>
		);
	}
});
