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
		return {'type': 'activities'};
	},

	_exportTypeActivities:function(type){
		this.setState({'type': 'activities'});
	},

	_exportTypeIndicators:function(type){
		this.setState({'type': 'indicators'});
	},

	render:function() {
		var indicatorsEnabled = this.state.layersVisible.indicators;
		var activitiesEnabled = this.state.layersVisible.shapes || this.state.layersVisible.points;
		var type = !activitiesEnabled? 'indicators': this.state.type;
		var errorArray = this.state.error?this.state.error.split(','):null;
		return (
			<div className="">
				<div className="export-selection-wrapper">
					<div className="blue-panel">
						<CustomRadioGroup>
							{activitiesEnabled?
				              <CustomRadio className="horizontal" name="activities" checked={type=='activities'? true : false}
				              	onClick={this._exportTypeActivities} label="savemap.exportactivities"/>
				            : null}
				            {indicatorsEnabled?
				              <CustomRadio className="horizontal" name="indicators" checked={type=='indicators'? true : false}
				              	onClick={this._exportTypeIndicators} label="savemap.exportindicators"/>
				            : null}
			            </CustomRadioGroup>
			        </div>
				</div>
				{errorArray?
					<div className="filter-no-results"><br/>
						{
							_.map(errorArray, function(e){
								return (<Message message={e}/>)
							})
						}
					</div>
				: null}
				{this.state.exportDisabled?
					<div><img className="img-centered" src="images/ajax-loader-small.gif"/></div>
				:null}
				<div className="adjacent-buttons">
					<Button className="btn btn-apply pull-right" disabled={this.state.exportDisabled?"disabled":""} onClick={this._export.bind(this)}>{i18n.t('savemap.exportbutton')}</Button>
					<Button  className="pull-right" onClick={this.props.onClose.bind(this)}>{i18n.t('savemap.closebutton')}</Button>
				</div>
			</div>
			);
		}
});
