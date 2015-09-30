'use strict';
var _ = require('lodash');
var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Button=require('react-bootstrap/lib/Button');

var NoResultsPopupStore=require('../../../stores/noResultsPopupStore.js');
var Reflux = require('reflux');

module.exports = React.createClass({

	mixins: [Reflux.connect(NoResultsPopupStore)],
	

	close:function(){
		this.setState({'showModal': false });
	},

	open:function(){
		this.setState({'showModal': true });
	},	
	
	render:function() {
		return (
			<div>
				<Modal  {...this.props} bsSize='large' className='indicator-search' aria-labelledby='contained-modal-title-lg' show={this.state.showModal} onHide={this.close}>
					<Modal.Header>
					<a className='close-dialog' href='#' onClick={this.close}>
					<i className='fa fa-times-circle-o'></i></a>
						<Modal.Title><i className='fa fa-arrows-h'></i><Message message='layers.noResultsForDataLayer'/></Modal.Title>
					</Modal.Header>
					<Modal.Body className='finder'>
						<div className='blue-panel'>
							<div className='plain-panel'>
								<div className='filter-no-results'><br/>
									{i18n.t(this.state.modalText)}
								</div>
					        </div>
						</div>						
					</Modal.Body>
					<Modal.Footer>
						<Button className='pull-right' onClick={this.close}><Message message='layers.close'/></Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}

});
