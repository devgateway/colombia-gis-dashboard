var React = require('react/addons');
var Modal=require('react-bootstrap/lib/Modal');
var Input=require('react-bootstrap/lib/Input');
var Button=require('react-bootstrap/lib/Button');
var If=require('../commons/if.jsx')
var Reflux = require('reflux');
var Actions=require('../../actions/saveActions.js');
var CustomRadio = require('../commons/customRadioButton.jsx').Radio;
var CustomRadioGroup = require('../commons/customRadioButton.jsx').RadioGroup;
var Store=require('../../stores/saveStore.js');
var _=require('lodash');

module.exports = React.createClass({


	mixins: [Reflux.connect(Store)],

	_export:function(){
		if(this.state.type=='activities'){
			Actions.exportActivities(this.state.format);
		} else {
			Actions.exportIndicators();	
		}
	},

	getInitialState:function(){
		return {'type': 'activities', 'format': 'csv'};
	},

	_exportTypeActivities:function(type){
		this.setState({'type': 'activities'});
	},
	
	_exportTypeIndicators:function(type){
		this.setState({'type': 'indicators'});
	},
	
	_exportFormatCSV:function(format){
		this.setState({'format': 'csv'});
	},
	
	_exportFormatXLS:function(format){
		this.setState({'format': 'xls'});
	},
	
	render:function() {
		var indicatorsEnabled = this.state.layersVisible.indicators;
		var activitiesEnabled = this.state.layersVisible.shapes || this.state.layersVisible.points;
		var type = !activitiesEnabled? 'indicators': this.state.type;
		return (
			<div className="">
				<div className="blue-panel">
					<div className="plain-panel">
						<CustomRadioGroup>
							{activitiesEnabled? 
				              <CustomRadio className="horizontal" name="activities" 
				              	onClick={this._exportTypeActivities} label="savemap.exportactivities"/>
				            : null}
				            {indicatorsEnabled?
				              <CustomRadio className="horizontal" name="indicators" 
				              	onClick={this._exportTypeIndicators} label="savemap.exportindicators"/>
				            : null}
			            </CustomRadioGroup>
			        </div>
					<If condition={type=='activities'} >	
						<div className="plain-panel">
							<CustomRadioGroup>
				              <CustomRadio className="" name="csv" 
				              	onClick={this._exportFormatCSV} label="CSV"/>
				              <CustomRadio className="" name="xls" 
				              	onClick={this._exportFormatXLS} label="XLS"/>
				            </CustomRadioGroup>
						</div>
					</If>
				</div>
				<div>
					<Button className="btn btn-apply pull-right" onClick={this._export.bind(this)}>{i18n.t('savemap.exportbutton')}</Button>
					<Button  className="pull-right" onClick={this.props.onClose.bind(this)}>{i18n.t('savemap.closebutton')}</Button>
				</div>
			</div>
			);
		}
});
