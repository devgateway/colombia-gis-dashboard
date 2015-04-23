'use strict';

var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var LayersAction=require('../../../../actions/layersAction.js');
var DataLayerStore=require('../../../../stores/dataLayerStore.js');
var RadioButton=require('../../../commons/customRadioButton.jsx');




module.exports  = React.createClass({
 mixins: [Reflux.connect(DataLayerStore, 'layers')],

	getInitialState: function() {
        return {'dataLayer': 'Financing'};
    },    

	showByDepartment:function(){
		console.log('layers->dataLayerSelector: ShowByDepartment');
		LayersAction.loadActivitiesByDepartments();
	},

	showByMunicipality:function(){
		console.log('layers->dataLayerSelector: showByMunicipality');
		LayersAction.loadActivitiesByMuncipalities();
	},

	enableFinancingSelector:function(){
		this.setState({'dataLayer': 'Financing'});
	},

	enableIndicatorSelector:function(){
		this.setState({'dataLayer': 'Indicators'});
	},

	componentDidMount :function(){ 
        this.showByDepartment();          
    },

    render: function() {
		var finSelectorClass = this.state.dataLayer=='Financing'? "" : "disabled";
		var indSelectorClass = this.state.dataLayer=='Indicators'? "" : "disabled";
		return (  
		<div className="inline">
			<div className="">
				<RadioButton name="dataLayer" label="Financing" selected={true} onClick={this.enableFinancingSelector}/>
				<div className={finSelectorClass}>
					<ul>
						<li>
							<RadioButton name="finLevel" selected={true} onClick={this.showByDepartment} label="layers.byDepartment"/>
							<RadioButton name="finLevel" onClick={this.showByMunicipality} label="layers.byMunicipality"/>	
						</li>
					</ul>					
				</div>
			</div>	
			<div className="">
				<RadioButton name="dataLayer" label="Indicators" onClick={this.enableIndicatorSelector}/>
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