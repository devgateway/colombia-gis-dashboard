var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Input=require('react-bootstrap/lib/Input');
var Button=require('react-bootstrap/lib/Button');
var If=require('../commons/if.jsx')
var Reflux = require('reflux');
var Actions=require('../../actions/saveActions.js');

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

	save:function(){
	//TODO add validations
		if(this.state.key=='save'){
			Actions.saveMap(this.state);
		} else if(this.state.key=='update') {
			Actions.updateMap(this.state.map.id, this.state);
		}
	},

	getInitialState:function(){
		return {title:'', description:''}
	},

	_updateTags:function(tags){
		this.setState({'tags':tags});
	},

	_updateTitle:function(event){
		this.setState({'title': event.target.value});
	},

	_updateDescription:function(event){
		this.setState({'description': event.target.value});
	},
	
	componentWillReceiveProps:function(nextProps){
		this.setState({'key': nextProps.store.key});
		this.setState({'errorMsg': nextProps.store.errorMsg});
		if (nextProps.store.map){
			var map = nextProps.store.map;
			this.setState({'title': map.title, 'description': map.description, 'tags': map.tags});
		}
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
						value={this.state.title} addonAfter='*'/>
					<Input type='textarea' name="description" 
						onChange={this._updateDescription}
						className="form-control" 
						rows="3" 
						placeholder={i18n.t('savemap.savemapdescription')} 
						value={this.state.description} maxlength="300" addonAfter='*' />
				</div>

				<div className="plain-panel">
					<h4 className="modal-title"><Message message='savemap.savemaptags'/></h4>
					<Tags onUpdate={this._updateTags} value={this.state.tags}/>
				</div>
				<div className="plain-panel"><Message message='savemap.mandatoryFields'/>
					<If condition={this.state.errorMsg} >
						<Message message={this.state.errorMsg}/>
					</If>
				</div>
				
				<div>
					<Button className="btn btn-apply pull-right" onClick={this.save.bind(this)}>{i18n.t('savemap.savebutton')}</Button>
					<Button  className="pull-right" onClick={this.props.close.bind(this)}>{i18n.t('savemap.closebutton')}</Button>
				</div>
			</div>
			);
		}
});
