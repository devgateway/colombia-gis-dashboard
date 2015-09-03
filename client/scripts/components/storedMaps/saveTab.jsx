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
		return (<Input ref="tags"
			className="form-control taginput"
			type="text" maxLength="80"
			defaultValue={this.props.value} onBlur={this._update} />)
	}

})


module.exports = React.createClass({

	mixins: [Reflux.connect(Store)],

	componentDidMount : function(){
    },

	save:function(){
		this.props.onClose();
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
		var errorArray = this.state.errorMsg?this.state.errorMsg.split(','):null;
		return (
			<div className="">
				<div className="">
					<Input name="title"
						type="text"
						className="form-control title"
						onChange={this._updateTitle}
						placeholder={i18n.t('savemap.savemaptitle')}
						value={this.state.map.title} maxLength="100" addonAfter='*'/>
					<Input type='textarea' name="description"
						onChange={this._updateDescription}
						className="form-control description"
						rows="3"
						placeholder={i18n.t('savemap.savemapdescription')}
						value={this.state.map.description} maxLength="300" addonAfter='*' />
				</div>

				<div className="">
					<h4 className="modal-title"><Message message='savemap.savemaptags'/></h4>
					<Tags onUpdate={this._updateTags} value={this.state.map.tags}/>
				</div>
				<div className=""><Message message='savemap.mandatoryFields'/>
					{
						_.map(errorArray, function(e){
							return (<Message message={e}/>)
						})
					}
				</div>

				<div className="adjacent-buttons">
					<Button className="btn btn-apply pull-right" onClick={this.save.bind(this)}>{i18n.t('savemap.savebutton')}</Button>
					<Button  className="pull-right" onClick={this.props.onClose.bind(this)}>{i18n.t('savemap.closebutton')}</Button>
				</div>
			</div>
			);
		}
});
