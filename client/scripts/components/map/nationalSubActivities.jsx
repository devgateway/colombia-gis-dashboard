'use strict';
var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Button=require('react-bootstrap/lib/Button');
var Store=require('../../stores/nationalSubActivitiesStore.js');
var Reflux = require('reflux');
var NationalPopupContent = require('./nationalSubActivitiesContent.jsx');

var _=require('lodash');

module.exports = React.createClass({
	mixins: [Reflux.connect(Store)],

	close:function(){
		this.setState({'showModal': false});
	},

	open:function(){
		this.setState({'showModal': true});
	},

	getInitialState:function(){
		return {'showModal': false}
	},

	render:function() {
		var showModal=this.state.showModal || false;
		var numberOfActivities;
		if (this.state.infoWindow){
			var actCounter = 0;
			_.map(this.state.infoWindow[4].value, function(v){actCounter+=parseInt(v.value)});
			numberOfActivities = '- ' + actCounter;
		}
		var nationalSubActivitiesCount = this.state.nationalSubactivities? this.state.nationalSubactivities.activities : 0;
		return (
			<span>
				<a href='#' data-toggle='modal' data-target='#myModal' onClick={nationalSubActivitiesCount>0? this.open : ''}><Message message='map.nationalSubActivities'/> ({nationalSubActivitiesCount})</a>
				<Modal className='dialog-national-subactivities' {...this.props} bsSize='medium' aria-labelledby='contained-modal-title-lg'
				 show={showModal} onHide={this.close}>
					<Modal.Header>
						<Modal.Title>
							<i className='fa fa-folder-open'></i> <Message message='map.nationalSubActivities'/>
							<span className='children-count'>{numberOfActivities}</span>
						</Modal.Title>
						<a className='close-dialog' href='#' onClick={this.close}>
						<i className='fa fa-times-circle-o'></i></a>

					</Modal.Header>
					<Modal.Body>
						<NationalPopupContent/>
					</Modal.Body>
				</Modal>
			</span>
			);
	}
});
