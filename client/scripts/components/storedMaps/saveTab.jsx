var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Input=require('react-bootstrap/lib/Input');
var Button=require('react-bootstrap/lib/Button');
var If=require('../commons/if.jsx')
var Reflux = require('reflux');
var Actions=require('../../actions/saveActions.js');
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

	mixins: [Reflux.connect(Store)],

	save:function(){
		if(this.state.map && this.state.map._id){
			Actions.updateMap(this.state.map._id, this.state.map);
		} else {
			Actions.saveMap(this.state.map);	
		}
	},

	getInitialState:function(){
		return {title:'', description:''}
	},

	_updateTags:function(tags){
		var map = _.clone(this.state.map);
		map.tags = tags;
		this.setState({'map':map});
	},

	_updateTitle:function(event){
		var map = _.clone(this.state.map);
		map.title = event.target.value;
		this.setState({'map':map});
	},

	_updateDescription:function(event){
		var map = _.clone(this.state.map);
		map.description = event.target.value;
		this.setState({'map':map});
	},
	
	render:function() {
		return (
			<div className="">
				<div className="blue-panel">
					<Input name="title" 
						type="text"
						className="form-control" 
						onChange={this._updateTitle}
						placeholder={i18n.t('savemap.savemaptitle')}  
						maxlength="100" 
						value={this.state.map.title} addonAfter='*'/>
					<Input type='textarea' name="description" 
						onChange={this._updateDescription}
						className="form-control" 
						rows="3" 
						placeholder={i18n.t('savemap.savemapdescription')} 
						value={this.state.map.description} maxlength="300" addonAfter='*' />
				</div>

				<div className="plain-panel">
					<h4 className="modal-title"><Message message='savemap.savemaptags'/></h4>
					<Tags onUpdate={this._updateTags} value={this.state.map.tags}/>
				</div>
				<div className="plain-panel"><Message message='savemap.mandatoryFields'/>
					<If condition={this.state.errorMsg} >
						<Message message={this.state.errorMsg}/>
					</If>
				</div>
				
				<div>
					<Button className="btn btn-apply pull-right" onClick={this.save.bind(this)}>{i18n.t('savemap.savebutton')}</Button>
					<Button  className="pull-right" onClick={this.props.onClose.bind(this)}>{i18n.t('savemap.closebutton')}</Button>
				</div>
			</div>
			);
		}
});
