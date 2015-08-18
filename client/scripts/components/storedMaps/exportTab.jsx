var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Input=require('react-bootstrap/lib/Input');
var Button=require('react-bootstrap/lib/Button');
var If=require('../commons/if.jsx')
var Reflux = require('reflux');
var Actions=require('../../actions/saveActions.js');
var CustomRadio = require('../commons/customRadioButton.jsx').Radio;
var CustomRadioGroup = require('../commons/customRadioButton.jsx').RadioGroup;

var _=require('lodash');

module.exports = React.createClass({


	_export:function(){
		//TODO add export actions
		
	},

	getInitialState:function(){
		return {'type': 'activities', 'format': 'csv'};
	},

	_exportTypeChanged:function(type){
		this.setState({'type': type});
	},
	
	_exportFormatChanged:function(format){
		this.setState({'format': format});
	},
	
	componentWillReceiveProps:function(nextProps){
		var indicatorsEnabled = nextProps.store.layersVisible.indicators;
		var activitiesEnabled = nextProps.store.layersVisible.shapes || nextProps.store.layersVisible.points;
		if (!activitiesEnabled){
			this.setState({'type': 'indicators'});
		}
		this.setState({'indicatorsEnabled': indicatorsEnabled});
		this.setState({'activitiesEnabled': activitiesEnabled});
	},

	render:function() {
		debugger;
		return (
			<div className="">
				<div className="blue-panel">
					<div className="plain-panel">
						<CustomRadioGroup>
			              <CustomRadio className="horizontal" name="activities" 
			              	checked={this.state.type=='activities'? true : false} 
			              	disabled={this.state.activitiesEnabled? false : true}
			              	onClick={this._exportTypeChanged} label="savemap.exportactivities"/>
			              <CustomRadio className="horizontal" name="indicators" 
			              	checked={this.state.type=='indicators'? true : false} 
			              	disabled={this.state.indicatorsEnabled? false : true}
			              	onClick={this._exportTypeChanged} label="savemap.exportindicators"/>
			            </CustomRadioGroup>
			        </div>
					<If condition={this.state.type=='activities'} >	
						<div className="plain-panel">
							<CustomRadioGroup>
				              <CustomRadio className="" name="csv" 
				              	checked={this.state.format=='csv'? true : false} 
				              	onClick={this._exportFormatChanged} label="CSV"/>
				              <CustomRadio className="" name="xls" 
				              	checked={this.state.format=='xls'? true : false} 
				              	onClick={this._exportFormatChanged} label="XLS"/>
				            </CustomRadioGroup>
						</div>
					</If>
				</div>
				<div>
					<Button className="btn btn-apply pull-right" onClick={this._export.bind(this)}>{i18n.t('savemap.exportbutton')}</Button>
					<Button  className="pull-right" onClick={this.props.close.bind(this)}>{i18n.t('savemap.closebutton')}</Button>
				</div>
			</div>
			);
		}
});
