var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Input=require('react-bootstrap/lib/Input');
var Button=require('react-bootstrap/lib/Button');
var If=require('../commons/if.jsx');
var IndicatorsFinderStore=require('../../stores/indicatorsFinderStore.js');
var Reflux = require('reflux');
var Actions=require('../../actions/saveActions.js');
var CheckBox=require('../commons/customCheckbox.jsx')
var Store=require('../../stores/saveStore.js');
var TabbedArea = require('react-bootstrap/lib/TabbedArea');
var TabPane = require('react-bootstrap/lib/TabPane');
var SaveTab = require('./saveTab.jsx')
var ExportTab = require('./exportTab.jsx')

var _=require('lodash');

module.exports = React.createClass({

	mixins: [Reflux.connect(Store)],

	_onClose:function(){
		Actions.hideModal();
	},

	open:function(){
		Actions.showModal();
	},

	render:function() {
		var showModal=this.state.showModal || false;
		return (
			<div className="save-map-trigger">
			<Modal className='dialog-save-map' {...this.props} bsSize='large' aria-labelledby='contained-modal-title-lg'
			 show={showModal} onHide={this.close}>
				<Modal.Header>
					<Modal.Title>
						<i className="fa fa-folder-open"></i><Message message='savemap.savemaplabel'/>
					</Modal.Title>
					<a className="close-dialog" href="#" onClick={this._onClose}>
					<i className="fa fa-times-circle-o"></i></a>
				</Modal.Header>
				<Modal.Body>
					<div className="activity-nav">
						<TabbedArea ref="tabbedArea" className="activities" defaultActiveKey={1}>
							<TabPane key={1} eventKey={1} tab={<Message message="savemap.savemaptab"/>} >
								<SaveTab onClose={this._onClose}/>
							</TabPane>
							{!(this.state.id)?
								<TabPane key={2} eventKey={2} tab={<Message message="savemap.exportmaptab"/>}>
									<ExportTab layersVisible={this.state.layersVisible} onClose={this._onClose}/>								
								</TabPane>
							: null}
						</TabbedArea>
					</div>
				</Modal.Body>
				<Modal.Footer>
				</Modal.Footer>
			</Modal>
			</div>
			);
		}
});
