'use strict';

var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var LayersAction=require('../../../../actions/layersAction.js');
var DataLayerStore=require('../../../../stores/dataLayerStore.js');
var RadioButton=require('../../../commons/customRadioButton.jsx');




module.exports  = React.createClass({
 mixins: [Reflux.connect(DataLayerStore, 'layers')],

	showByDepartment:function(){
		console.log('layers->dataLayerSelector: ShowByDepartment');
		LayersAction.loadActivitiesByDepartments();
	},

	showByMunicipality:function(){
		console.log('layers->dataLayerSelector: showByMunicipality');
		LayersAction.loadActivitiesByMuncipalities();
	},

	enableFinancingSelector:function(event){
		this.setState({'layerLevel': 'Financing'});
	},

	enableIndicatorSelector:function(event){
		this.setState({'layerLevel': 'Indicators'});
	},

	render: function() {
		var finSelectorClass = this.state.layerLevel == 'Financing'? "" : "disabled";
		var indSelectorClass = this.state.layerLevel == 'Indicators'? "" : "disabled";
		return (  
		<div className="inline">
			<div className="">
				<RadioButton name="layerLevel" label="Financing" onClick={this.enableFinancingSelector}/>
				<div className={finSelectorClass}>
					<ul>
						<li>
							<RadioButton name="finLevel" onClick={this.showByDepartment} label="layers.byDepartment"/>
							<RadioButton name="finLevel" onClick={this.showByMunicipality} label="layers.byMunicipality"/>	
						</li>
					</ul>					
				</div>
			</div>
			<div className="">
				<RadioButton name="layerLevel" label="Indicators" onClick={this.enableIndicatorSelector}/>
				<div className={indSelectorClass}>
					<ul>
						<li>
							<RadioButton name="indLevel" onClick={this.showByDepartment} label="layers.byDepartment"/>
							<RadioButton name="indLevel" onClick={this.showByMunicipality} label="layers.byMunicipality"/>
						</li>
					</ul>
				</div>
			</div>	
		</div>   
		);
	}

});